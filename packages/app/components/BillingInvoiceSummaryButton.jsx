import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const BillingInvoiceSummaryButton = ({
  latestInvoiceSelected,
  outstandingAmount,
  invoiceUrl,
  spending,
  className,
}) => {
  // Button to pay outstanding invoice
  // TODO: Use BillingOpenFailedInvoice component to handle payment failures in app
  if (outstandingAmount && latestInvoiceSelected) {
    return (
      <Button
        version="black small"
        className={[className, 'bg-red'].join(' ')}
        href={invoiceUrl}
        trackComponentName="BillingInvoiceSummaryButton"
      >
        Pay {outstandingAmount}
      </Button>
    )
  }

  // Ask user to set a budget if there are no historical invoices
  // and there is no spend on the "upcoming" invoice
  if (!spending) {
    return (
      <Button
        version="black small"
        href="/controls"
        trackComponentName="BillingInvoiceSummaryButton"
        className={className}
      >
        Set a budget
      </Button>
    )
  }
  return null
}

BillingInvoiceSummaryButton.propTypes = {
  latestInvoiceSelected: PropTypes.bool.isRequired,
  outstandingAmount: PropTypes.bool.isRequired,
  invoiceUrl: PropTypes.string,
  spending: PropTypes.bool.isRequired,
}

BillingInvoiceSummaryButton.defaultProps = {
  invoiceUrl: '',
}

export default BillingInvoiceSummaryButton
