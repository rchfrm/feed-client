import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingProrations from '@/app/PricingProrations'

import Spinner from '@/elements/Spinner'

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
  setError,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  const {
    organisation,
    organisationArtists,
  } = useBillingStore(getBillingStoreState)

  const { id: organisationId } = organisation

  React.useEffect(() => {
    // Filter out the current profile
    const otherProfiles = organisationArtists.filter((profile) => profile.id !== artistId)

    // Create plans object keyed by profile id
    const otherProfilesPlans = otherProfiles.reduce((result, { id, plan }) => {
      return {
        ...result,
        [id]: plan,
      }
    }, {})

    // Update the 'profiles to upgrade' state
    setProfilesToUpgrade({
      [artistId]: plan,
      ...otherProfilesPlans,
    })
  }, [artistId, organisationArtists, setProfilesToUpgrade, plan])

  // Fetch and format prorations preview when the profilesToUpgrade object changes
  useAsyncEffect(async (isMounted) => {
    if (!Object.keys(profilesToUpgrade).length) return

    setIsLoading(true)
    setError(null)

    const { res: prorationsPreview, error } = await getProrationsPreview(organisationId, profilesToUpgrade)
    if (!isMounted()) return

    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }

    const formattedProrations = formatProrationsPreview({ profilesToUpgrade, organisationArtists, prorationsPreview })

    setProrationsPreview(formattedProrations)
    setIsLoading(false)
  }, [profilesToUpgrade])

  if (isLoading) return <Spinner className="h-40 flex items-center" width={28} />

  if (!prorationsPreview) return

  return (
    <div className={[
      'w-full',
      className,
    ].join(' ')}
    >
      <PricingProrations
        prorationsPreview={prorationsPreview}
      />
    </div>
  )
}

PricingProrationsLoader.propTypes = {
  plan: PropTypes.string.isRequired,
  profilesToUpgrade: PropTypes.object.isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  prorationsPreview: PropTypes.object.isRequired,
  setProrationsPreview: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PricingProrationsLoader.defaultProps = {
  className: null,
}

export default PricingProrationsLoader
