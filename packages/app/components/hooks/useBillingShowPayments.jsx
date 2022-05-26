import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import BillingPaymentMethodsAll from '@/app/BillingPaymentMethodsAll'

const useBillingShowPayments = () => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // OPEN ADD PAYMENT METHOD
  const openShowPaymentMethods = React.useCallback(() => {
    const content = <BillingPaymentMethodsAll />
    setSidePanelContent(content)
    setSidePanelContentLabel('Show all payment methods')
    toggleSidePanel(true)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openShowPaymentMethods
}

export default useBillingShowPayments
