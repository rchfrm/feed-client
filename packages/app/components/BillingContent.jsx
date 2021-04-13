import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import { UserContext } from '@/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import BillingInvoiceSummary from '@/app/BillingInvoiceSummary'
import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'
import BillingReferralsSummary from '@/app/BillingReferralsSummary'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  loading: state.loading,
  defaultPaymentMethod: state.defaultPaymentMethod,
  setupBilling: state.setupBilling,
  nextInvoice: state.nextInvoice,
  loadingErrors: state.loadingErrors,
})

const BillingContent = () => {
  const { user } = React.useContext(UserContext)

  // Read from BILLING STORE
  const {
    loading: billingLoading,
    loadingErrors,
    setupBilling,
    defaultPaymentMethod,
    nextInvoice,
  } = useBillingStore(getBillingStoreState, shallow)

  // Load billing info
  React.useEffect(() => {
    setupBilling(user)
  }, [user, setupBilling])

  if (billingLoading) return <Spinner />

  return (
    <div
      className="grid grid-cols-2 gap-12 pb-12"
    >
      <div className="col-span-1">
        {/* ERRORS */}
        {loadingErrors.map((error, index) => <Error key={index} error={error} />)}
        {/* INVOICES */}
        <BillingInvoiceSummary nextInvoice={nextInvoice} className="mb-12" />
        {/* PAYMENT METHOD */}
        <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />
      </div>
      <div className="col-span-1">
        <BillingReferralsSummary canTransferCredits />
      </div>
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
