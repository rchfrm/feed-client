import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import GetStartedPricingReadMore from '@/app/GetStartedPricingReadMore'
import Button from '@/elements/Button'

const useOpenPricingPlanReadMoreSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const openPricingPlanReadMoreSidePanel = React.useCallback((plan, currencyCode, objective) => {
    const content = (
      <GetStartedPricingReadMore
        plan={plan}
        currencyCode={currencyCode}
        objective={objective}
      />
    )
    const button = <Button onClick={() => toggleSidePanel(false)} trackComponentName="PricingPlanReadMoreSidePanel" isSidePanel>Done</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel('Read more about pricing plan')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openPricingPlanReadMoreSidePanel
}

export default useOpenPricingPlanReadMoreSidePanel
