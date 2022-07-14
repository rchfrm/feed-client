import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/global'

const PricingPlanUpgradeSummary = ({
  setSidePanelButton,
  toggleSidePanel,
  profilesToUpgrade,
}) => {
  const [profile] = profilesToUpgrade
  const { plan: currentPlan } = profile
  const { artist: { name: currentProfile } } = React.useContext(ArtistContext)

  const closeSidePanel = React.useCallback(() => {
    toggleSidePanel(false)
  }, [toggleSidePanel])

  React.useEffect(() => {
    const button = <Button version="green" onClick={closeSidePanel} trackComponentName="PricingPlanUpgradeSummary">Ok</Button>

    setSidePanelButton(button)
  }, [closeSidePanel, setSidePanelButton])

  return (
    <div>
      <h2 className="mb-8 pr-12">Thank you!</h2>
      <MarkdownText markdown={copy.pricingUpgradeSummary(currentProfile, currentPlan)} />
    </div>
  )
}

PricingPlanUpgradeSummary.propTypes = {
  setSidePanelButton: PropTypes.func,
  toggleSidePanel: PropTypes.func,
  profilesToUpgrade: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.string,
      plan: PropTypes.string,
    }),
  ),
}

PricingPlanUpgradeSummary.defaultProps = {
  setSidePanelButton: () => {},
  toggleSidePanel: () => {},
  profilesToUpgrade: [],
}

export default PricingPlanUpgradeSummary
