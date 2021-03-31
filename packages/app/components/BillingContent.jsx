import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { UserContext } from '@/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'

import BillingPaymentMethods from '@/app/BillingPaymentMethods'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  loading: state.loading,
  billingDetails: state.billingDetails,
  defaultPaymentMethod: state.defaultPaymentMethod,
  setupBilling: state.setupBilling,
})

const BillingContent = () => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const { user } = React.useContext(UserContext)

  // Read from BILLING STORE
  const {
    loading: billingLoading,
    billingDetails,
    setupBilling,
    defaultPaymentMethod,
  } = useBillingStore(getBillingStoreState, shallow)

  // Load billing info
  React.useEffect(() => {
    setupBilling(user)
  }, [user, setupBilling])

  if (billingLoading) return null

  return (
    <div
      className=""
    >
      <BillingPaymentMethods
        paymentMethods={billingDetails.allPaymentMethods}
        defaultPaymentMethod={defaultPaymentMethod}
      />
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
