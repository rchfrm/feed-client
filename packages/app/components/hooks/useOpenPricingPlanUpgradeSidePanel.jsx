import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlanUpgradeSidePanel from '@/app/PricingPlanUpgradeSidePanel'
import Button from '@/elements/Button'

const useOpenPricingPlanUpgradeSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const openPricingPlanUpgradeSidePanel = React.useCallback((section) => {
    const content = <PricingPlanUpgradeSidePanel section={section} />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel('Upgrade pricing plan')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openPricingPlanUpgradeSidePanel
}

export default useOpenPricingPlanUpgradeSidePanel
