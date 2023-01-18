import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'

import PricingPlanUpgradeSidePanel from '@/app/PricingPlanUpgradeSidePanel'
import ButtonNew from '@/elements/ButtonNew'

const useOpenPricingPlanUpgradeSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  return React.useCallback((section) => {
    const content = <PricingPlanUpgradeSidePanel section={section} />
    const button = <ButtonNew className="w-full rounded-none" onClick={() => toggleSidePanel(false)} trackComponentName="PricingPlanUpgradeSidePanel">Done</ButtonNew>

    setSidePanelContent(content)
    setSidePanelContentLabel('Upgrade pricing plan')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
}

export default useOpenPricingPlanUpgradeSidePanel
