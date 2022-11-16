import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingProrations from '@/app/PricingProrations'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { getProrationsPreview, formatProrationsPreview, formatProfilesToUpgrade } from '@/app/helpers/billingHelpers'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationArtists: state.organizationArtists,
})

const PricingProrationsLoader = ({
  profilesToUpgrade,
  prorationsPreview,
  setProrationsPreview,
  promoCode,
  isAnnualPricing,
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  const {
    organization,
    organizationArtists,
  } = useBillingStore(getBillingStoreState)

  const { id: organizationId } = organization

  // Fetch and format prorations preview
  const getProrations = async (profilesToUpgrade) => {
    setError(null)
    setIsLoading(true)

    const { res: prorationsPreview, error } = await getProrationsPreview(organizationId, profilesToUpgrade, promoCode)

    if (error) {
      setError(error)
      setIsLoading(false)

      return false
    }

    return formatProrationsPreview({ profilesToUpgrade, organizationArtists, prorationsPreview })
  }

  useAsyncEffect(async (isMounted) => {
    if (!profilesToUpgrade[artistId]) return

    const profilesWithPlan = formatProfilesToUpgrade(profilesToUpgrade, isAnnualPricing)

    const formattedProrations = await getProrations(profilesWithPlan)
    if (!isMounted() || !formattedProrations) return

    setProrationsPreview(formattedProrations)
    setIsLoading(false)
  }, [profilesToUpgrade])

  if (isLoading) return <Spinner className="h-40 flex items-center" width={28} />

  return (
    <div className="w-full">
      <PricingProrations
        prorationsPreview={prorationsPreview}
        isAnnualPricin={isAnnualPricing}
      />
      <Error error={error} />
    </div>
  )
}

PricingProrationsLoader.propTypes = {
  profilesToUpgrade: PropTypes.object,
  prorationsPreview: PropTypes.object,
  setProrationsPreview: PropTypes.func,
  isAnnualPricing: PropTypes.bool,
}

PricingProrationsLoader.defaultProps = {
  profilesToUpgrade: {},
  prorationsPreview: null,
  setProrationsPreview: () => {},
  isAnnualPricing: false,
}

export default PricingProrationsLoader
