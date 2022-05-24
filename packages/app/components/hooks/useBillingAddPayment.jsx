import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import BillingPaymentAdd from '@/app/BillingPaymentAdd'

const useBillingAddPayment = () => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    setSidePanelLoading,
    toggleSidePanel,
    sidePanelLoading,
  } = React.useContext(SidePanelContext)
  // OPEN ADD PAYMENT METHOD
  const openAddPaymentMethod = React.useCallback((shouldBeDefault) => {
    const content = (
      <BillingPaymentAdd
        shouldBeDefault={shouldBeDefault}
        toggleSidePanel={toggleSidePanel}
        setSidePanelButton={setSidePanelButton}
        setSidePanelLoading={setSidePanelLoading}
        sidePanelLoading={sidePanelLoading}
      />
    )
    setSidePanelContent(content)
    setSidePanelContentLabel('Add payment method')
    toggleSidePanel(true)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, setSidePanelLoading, sidePanelLoading])

  return openAddPaymentMethod
}

export default useBillingAddPayment
