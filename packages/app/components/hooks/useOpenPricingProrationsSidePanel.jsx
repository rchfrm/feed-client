import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import PricingProrationsLoader from '@/app/PricingProrationsLoader'
import Button from '@/elements/Button'

const useOpenPricingProrationsSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  return React.useCallback((profilePlans, promoCode) => {
    const content = (
      <div>
        <h2 className="mb-8 pr-12">Payment</h2>
        <PricingProrationsLoader
          profilesToUpgrade={profilePlans}
          promoCode={promoCode}
        />
      </div>
    )
    const button = <Button onClick={() => toggleSidePanel(false)} isSidePanel>Close</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel('Pricing prorations')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
}

export default useOpenPricingProrationsSidePanel
