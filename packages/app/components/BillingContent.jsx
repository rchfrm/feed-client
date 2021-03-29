import React from 'react'
// import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { BillingContext } from '@/app/contexts/BillingContext'

import BillingPaymentMethods from '@/app/BillingPaymentMethods'

const BillingContent = () => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // BILLING CONTEXT
  const {
    billingLoading,
    billingDetails,
  } = React.useContext(BillingContext)

  console.log('billingDetails', billingDetails)
  console.log('billingDetails.allPaymentMethods', billingDetails.allPaymentMethods)

  if (billingLoading) return null

  return (
    <div
      className=""
    >
      <BillingPaymentMethods paymentMethods={billingDetails.allPaymentMethods} />
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
