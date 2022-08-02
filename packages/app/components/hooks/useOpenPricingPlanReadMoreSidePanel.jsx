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

  const openPricingPlanReadMoreSidePanel = React.useCallback((plan, currency) => {
    const content = <GetStartedPricingReadMore plan={plan} currency={currency} />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel('Read more about pricing plan')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openPricingPlanReadMoreSidePanel
}

export default useOpenPricingPlanReadMoreSidePanel
