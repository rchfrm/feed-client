import React from 'react'
import PropTypes from 'prop-types'

import sidePanelStyles from '@/app/SidePanel.module.css'

import useBillingStore from '@/app/stores/billingStore'

const getFailedInvoice = state => state.nextInvoice

const BillingHandleFailedInvoice = ({
  setSidePanelLoading,
  setSidePanelButton,
}) => {
  const failedInvoice = useBillingStore(getFailedInvoice)
  console.log('failedInvoice', failedInvoice)
  return (
    <div>
      <h2 className={sidePanelStyles.SidePanel__Header}>Resolve unpaid invoice</h2>
    </div>
  )
}

BillingHandleFailedInvoice.propTypes = {
  setSidePanelLoading: PropTypes.func.isRequired,
  setSidePanelButton: PropTypes.func.isRequired,
}

BillingHandleFailedInvoice.defaultProps = {
}

export default BillingHandleFailedInvoice
