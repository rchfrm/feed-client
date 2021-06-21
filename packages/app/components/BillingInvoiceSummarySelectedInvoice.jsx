import React from 'react'
import PropTypes from 'prop-types'

const BillingInvoiceSummarySelectedInvoice = ({
  invoice,
  noLatestInvoiceOrIsPaid,
  upcomingInvoiceSpendAndFee,
}) => {
  if (noLatestInvoiceOrIsPaid && !upcomingInvoiceSpendAndFee) {
    return (
      <p className="text-center">Start reaching new audiences by setting a budget from the <a href="/controls" target="_self">controls page</a>!</p>
    )
  }
  const sections = invoice.invoiceSections
  return (
    <>
      <p className={`inline-block py-2 px-4 mb-6 rounded-full ${invoice.paymentStatus === 'failed' ? 'text-white bg-red font-bold' : 'bg-grey-2'}`}>{invoice.paymentStatus}</p>
      <div className="border-solid border-2 mb-6 p-3 border-green rounded-dialogue">
        <div className="flex justify-between font-bold">
          <p className="mb-3">Total spent</p>
          <p className="mb-3">{invoice.formatServiceFeePlusAdSpend}</p>
        </div>
        <div className="flex justify-between">
          <p className="mb-0">of which, Feed service fee</p>
          <p className="mb-0">{invoice.totalFee}</p>
        </div>
      </div>
      <div className="p-3 mb-6 rounded-dialogue bg-grey-1">
        {sections.map(section => {
          // TODO: Breakdown invoice by spend by profiles in organisation, relevant data needed from api
          return (
            <div key={section.slug} className="flex justify-between">
              <p className="mb-5">{section.title}</p>
              <p className="mb-5">{section.value}</p>
            </div>
          )
        })}
        <p className="small--p italic mb-0">You will receive a separate invoice directly from Facebook for the ad spend.</p>
      </div>
    </>
  )
}

BillingInvoiceSummarySelectedInvoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  noLatestInvoiceOrIsPaid: PropTypes.bool.isRequired,
  upcomingInvoiceSpendAndFee: PropTypes.string.isRequired,
}

export default BillingInvoiceSummarySelectedInvoice
