import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import { getUpgradedProfilesArray } from '@/app/helpers/billingHelpers'

import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradePaymentProrations = ({
  prorationsPreview,
  profilesToUpgrade,
  isLoading,
}) => {
  const [upgradedProfiles, setUpgradedProfiles] = React.useState([])
  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)
  const { profileAmounts, currency } = prorationsPreview || {}

  React.useEffect(() => {
    const profiles = getUpgradedProfilesArray({ profilesToUpgrade, organisationArtists, profileAmounts, currency })

    setUpgradedProfiles(profiles)
  }, [organisationArtists, profilesToUpgrade, profileAmounts, currency])

  if (isLoading) return <Spinner className="h-32 flex items-center" width={28} />

  return (
    <>
      <p className="font-bold">To pay today:</p>
      <MarkdownText markdown={copy.pricingUpgradeCurrentPaymentList(upgradedProfiles, currency)} className="mb-6" />
      <p className="font-bold">Your next invoice will be for:</p>
      <MarkdownText markdown={copy.pricingUpgradeNextPaymentList(upgradedProfiles, currency)} />
    </>
  )
}

PricingPlanUpgradePaymentProrations.propTypes = {
  prorationsPreview: PropTypes.object.isRequired,
}

PricingPlanUpgradePaymentProrations.defaultProps = {
}

export default PricingPlanUpgradePaymentProrations
