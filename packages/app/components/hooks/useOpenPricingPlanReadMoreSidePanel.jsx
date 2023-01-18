import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import GetStartedPricingReadMore from '@/app/GetStartedPricingReadMore'
import ButtonNew from '@/elements/ButtonNew'

const useOpenPricingPlanReadMoreSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const openPricingPlanReadMoreSidePanel = React.useCallback((plan, currencyCode, objective, isDisabled) => {
    const content = (
      <GetStartedPricingReadMore
        plan={plan}
        currencyCode={currencyCode}
        objective={objective}
        isDisabled={isDisabled}
      />
    )
    const button = <ButtonNew className="w-full rounded-none" onClick={() => toggleSidePanel(false)}>Done</ButtonNew>

    setSidePanelContent(content)
    setSidePanelContentLabel('Read more about pricing plan')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openPricingPlanReadMoreSidePanel
}

export default useOpenPricingPlanReadMoreSidePanel
