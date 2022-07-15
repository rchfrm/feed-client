import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradeSummary = ({
  setSidePanelButton,
  toggleSidePanel,
  profilesToUpgrade,
}) => {
  const [upgradedProfiles, setUpgradedProfiles] = React.useState([])
  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)

  React.useEffect(() => {
    const profiles = Object.keys(profilesToUpgrade).reduce((array, id) => {
      const profile = organisationArtists.find((profile) => profile.id === id)

      array.push({
        name: profile.name,
        plan: profilesToUpgrade[id],
      })

      return array
    }, [])

    setUpgradedProfiles(profiles)
  }, [organisationArtists, profilesToUpgrade])

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
