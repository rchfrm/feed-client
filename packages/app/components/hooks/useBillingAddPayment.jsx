import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import BillingPaymentAdd from '@/app/BillingPaymentAdd'

const useBillingAddPayment = () => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    setSidePanelLoading,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // OPEN ADD PAYMENT METHOD
  const openAddPaymentMethod = React.useCallback((setAsDefault) => {
    const content = (
      <BillingPaymentAdd
        setAsDefault={setAsDefault}
        toggleSidePanel={toggleSidePanel}
        setSidePanelButton={setSidePanelButton}
        setSidePanelLoading={setSidePanelLoading}
      />
    )
    setSidePanelContent(content)
    setSidePanelContentLabel('Add payment method')
    toggleSidePanel(true)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, setSidePanelLoading])

  return openAddPaymentMethod
}

export default useBillingAddPayment
