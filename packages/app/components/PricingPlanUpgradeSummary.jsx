import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import { getUpgradedProfilesArray } from '@/app/helpers/billingHelpers'

import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradeSummary = ({
  setSidePanelButton,
  toggleSidePanel,
  profilesToUpgrade,
  prorationsPreview,
}) => {
  const [upgradedProfiles, setUpgradedProfiles] = React.useState([])
  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)
  const { profileAmounts, currency } = prorationsPreview || {}

  React.useEffect(() => {
    const profiles = getUpgradedProfilesArray({ profilesToUpgrade, organisationArtists, profileAmounts, currency })

    setUpgradedProfiles(profiles)
  }, [organisationArtists, profilesToUpgrade, profileAmounts, currency])

  const closeSidePanel = React.useCallback(() => {
    toggleSidePanel(false)
  }, [toggleSidePanel])

  React.useEffect(() => {
    const button = <Button version="green" onClick={closeSidePanel} trackComponentName="PricingPlanUpgradeSummary">Ok</Button>

    setSidePanelButton(button)
  }, [closeSidePanel, setSidePanelButton])

  if (!upgradedProfiles.length) return

  return (
    <div>
      <h2 className="mb-8 pr-12">Thank you!</h2>
      <MarkdownText markdown={copy.pricingUpgradeSummary(upgradedProfiles)} />
    </div>
  )
}

PricingPlanUpgradeSummary.propTypes = {
  setSidePanelButton: PropTypes.func,
  toggleSidePanel: PropTypes.func,
  profilesToUpgrade: PropTypes.objectOf(PropTypes.string),

}

PricingPlanUpgradeSummary.defaultProps = {
  setSidePanelButton: () => {},
  toggleSidePanel: () => {},
  profilesToUpgrade: null,
}

export default PricingPlanUpgradeSummary
