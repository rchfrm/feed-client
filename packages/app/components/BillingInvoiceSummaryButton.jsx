import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import BillingOpenInvoices from '@/app/BillingOpenInvoices'

const BillingInvoiceSummaryButton = ({
  latestInvoice,
  latestInvoiceSelected,
  outstandingAmount,
  invoiceUrl,
  spending,
}) => {
  // Button to pay outstanding invoice
  // TODO: Use BillingOpenFailedInvoice component to handle payment failures in app
  if (outstandingAmount && latestInvoiceSelected) {
    return (
      <Button
        version="black small"
        className="bg-red"
        href={invoiceUrl}
      >
        Pay {outstandingAmount}
      </Button>
    )
  }
  // Button to show historical invoices
  if (latestInvoice.paymentStatus) {
    return (
      <BillingOpenInvoices />
    )
  }
  // Ask user to set a budget if there are no historical invoices
  // and there is no spend on the "upcoming" invoice
  if (!spending) {
    return (
      <Button
        version="black small"
        href="/controls"
      >
        Set a budget
      </Button>
    )
  }
  return null
}

BillingInvoiceSummaryButton.propTypes = {
  latestInvoice: PropTypes.object.isRequired,
  latestInvoiceSelected: PropTypes.bool.isRequired,
  outstandingAmount: PropTypes.string.isRequired,
  invoiceUrl: PropTypes.string.isRequired,
  spending: PropTypes.bool.isRequired,
}

export default BillingInvoiceSummaryButton
