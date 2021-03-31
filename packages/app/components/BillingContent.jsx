import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import { UserContext } from '@/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'

import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  loading: state.loading,
  defaultPaymentMethod: state.defaultPaymentMethod,
  setupBilling: state.setupBilling,
})

const BillingContent = () => {
  const { user } = React.useContext(UserContext)

  // Read from BILLING STORE
  const {
    loading: billingLoading,
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
      <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
