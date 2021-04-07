import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import { UserContext } from '@/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'

import BillingInvoiceSummary from '@/app/BillingInvoiceSummary'
import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  loading: state.loading,
  defaultPaymentMethod: state.defaultPaymentMethod,
  setupBilling: state.setupBilling,
  nextInvoice: state.nextInvoice,
})

const BillingContent = () => {
  const { user } = React.useContext(UserContext)

  // Read from BILLING STORE
  const {
    loading: billingLoading,
    setupBilling,
    defaultPaymentMethod,
    nextInvoice,
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
      {/* INVOICES */}
      <BillingInvoiceSummary nextInvoice={nextInvoice} />
      {/* PAYMENT METHOD */}
      <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
