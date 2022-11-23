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

  const [prorationsPreview, setProrationsPreview] = React.useState(null)

  const openPricingProrationsSidePanel = React.useCallback((artist, promoCode) => {
    const { id: artistId, plan } = artist
    const [planPrefix] = plan.split('_')
    const content = (
      <div>
        <h2 className="mb-8 pr-12">Payment</h2>
        <PricingProrationsLoader
          prorationsPreview={prorationsPreview}
          setProrationsPreview={setProrationsPreview}
          profilesToUpgrade={{ [artistId]: planPrefix }}
          promoCode={promoCode}
        />
      </div>
    )
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Close</Button>

    setSidePanelContent(content)
    setSidePanelContentLabel('Pricing prorations')
    setSidePanelButton(button)
    toggleSidePanel(true)
  }, [prorationsPreview, setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openPricingProrationsSidePanel
}

export default useOpenPricingProrationsSidePanel
