import React from 'react'
// import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { BillingContext } from '@/app/contexts/BillingContext'


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

  if (billingLoading) return null

  return (
    <div
      className=""
    >
      Billing
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
