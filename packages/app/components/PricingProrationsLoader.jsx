import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingProrations from '@/app/PricingProrations'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { getProrationsPreview, formatProrationsPreview } from '@/app/helpers/billingHelpers'

const getBillingStoreState = (state) => ({
  organisation: state.organisation,
  organisationArtists: state.organisationArtists,
})

const PricingProrationsLoader = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  prorationsPreview,
  setProrationsPreview,
  plan,
  promoCode,
}) => {
  const [prorations, setProrations] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  const {
    organisation,
    organisationArtists,
  } = useBillingStore(getBillingStoreState)

  const { id: organisationId } = organisation

  // Fetch and format prorations preview
  const getProrations = async (profilesToUpgrade) => {
    setError(null)
    setIsLoading(true)

    const { res: prorationsPreview, error } = await getProrationsPreview(organisationId, profilesToUpgrade, promoCode)

    if (error) {
      setError(error)
      setIsLoading(false)

      return false
    }

    return formatProrationsPreview({ profilesToUpgrade, organisationArtists, prorationsPreview })
  }

  useAsyncEffect(async (isMounted) => {
    // Filter out the current profile
    const otherProfiles = organisationArtists.filter((profile) => profile.id !== artistId)

    // Create plans object keyed by profile id
    const otherProfilesPlans = otherProfiles.reduce((result, { id, plan }) => {
      return {
        ...result,
        [id]: plan,
      }
    }, {})

    const profiles = {
      [artistId]: plan,
      ...otherProfilesPlans,
    }

    // If this prop isn't passed fetch prorations and update local state
    if (!setProfilesToUpgrade) {
      const formattedProrations = await getProrations(profiles)
      if (!isMounted() || !formattedProrations) return

      setProrations(formattedProrations)
      setIsLoading(false)

      return
    }

    // Otherwise update parent state
    setProfilesToUpgrade(profiles)
  }, [artistId, organisationArtists, setProfilesToUpgrade, plan])

  // Watch for changes of the profilesToUpgrade object
  useAsyncEffect(async (isMounted) => {
    if (!profilesToUpgrade) return

    const formattedProrations = await getProrations(profilesToUpgrade)
    if (!isMounted() || !formattedProrations) return

    setProrationsPreview(formattedProrations)
    setIsLoading(false)
  }, [profilesToUpgrade])

  if (isLoading) return <Spinner className="h-40 flex items-center" width={28} />

  return (
    <div className={[
      'w-full',
    ].join(' ')}
    >
      <PricingProrations
        prorationsPreview={prorationsPreview || prorations}
      />
      <Error error={error} />
    </div>
  )
}

PricingProrationsLoader.propTypes = {
  profilesToUpgrade: PropTypes.object,
  setProfilesToUpgrade: PropTypes.func,
  prorationsPreview: PropTypes.object,
  setProrationsPreview: PropTypes.func,
  plan: PropTypes.string.isRequired,
}

PricingProrationsLoader.defaultProps = {
  profilesToUpgrade: null,
  setProfilesToUpgrade: null,
  prorationsPreview: null,
  setProrationsPreview: null,
}

export default PricingProrationsLoader
