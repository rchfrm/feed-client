import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Button from '@/elements/Button'

import BillingOpenFailedInvoice from '@/app/BillingOpenFailedInvoice'
import BillingOpenInvoices from '@/app/BillingOpenInvoices'

const formatDate = date => moment(date).format('DD MMMM YYYY')

const formatDateRange = (startDate, endDate) => {
  startDate = moment(startDate).format('D')
  endDate = moment(endDate).format('D MMM YY')
  return `${startDate} - ${endDate}`
}

const BILLING_INVOICE_SUMMARY_HEADER = ({
  latestInvoicePaymentStatus,
  latestInvoiceDueDate,
  upcomingInvoiceDueDate,
  upcomingInvoiceSpendAndFee,
}) => {
  const getHeader = () => {
    if (latestInvoicePaymentStatus === 'failed') {
      return 'Invoice overdue'
    }
    if (upcomingInvoiceSpendAndFee === 0) {
      return 'Nothing to pay!'
    }
    if (latestInvoicePaymentStatus === 'paid') {
      return `Next payment: ${formatDate(upcomingInvoiceDueDate)}`
    }
    return `Next payment: ${formatDate(latestInvoiceDueDate)}`
  }

  return <h3 className="font-body font-bold mb-6">{getHeader()}</h3>
}

const BILLING_PERIOD_OPTIONS = ({
  noLatestInvoiceOrIsPaid,
  latestInvoicePeriod,
  upcomingInvoicePeriod,
  upcomingInvoiceSpendAndFee,
  selectedInvoiceName,
  setSelectedInvoiceName,
}) => {
  if (noLatestInvoiceOrIsPaid && upcomingInvoiceSpendAndFee === 0) return <></>

  const LATEST = () => {
    if (noLatestInvoiceOrIsPaid) return <></>
    const selected = selectedInvoiceName === 'latest'
    return (
      <button
        className={`mb-0 mr-3 ${selected ? 'font-bold black--underline' : 'text-grey-3'}`}
        onClick={() => setSelectedInvoiceName('latest')}
      >
        {formatDateRange(latestInvoicePeriod.start, latestInvoicePeriod.end)}
      </button>
    )
  }
  const UPCOMING = () => {
    const selected = selectedInvoiceName === 'upcoming'
    return (
      <button
        className={`
        mb-0
        ${selected ? 'font-bold' : 'text-grey-3'}
        ${selected && !noLatestInvoiceOrIsPaid && 'black--underline'}
        ${noLatestInvoiceOrIsPaid && 'cursor-text'}
        `}
        onClick={() => setSelectedInvoiceName('upcoming')}
        disabled={noLatestInvoiceOrIsPaid}
      >
        {formatDateRange(upcomingInvoicePeriod.start, upcomingInvoicePeriod.end)}
      </button>
    )
  }
  return (
    <div className="flex pb-6">
      <p className="mb-0 mr-3">Billing period:</p>
      <LATEST />
      <UPCOMING />
    </div>
  )
}

const SELECTED_INVOICE = ({ invoice }) => {
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

const INVOICE_SUMMARY_BUTTON = ({
  latestInvoice,
  latestInvoiceSelected,
  outstandingAmount,
  invoiceUrl,
}) => {
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
  return (
    <div>
      {/* BUTTON FOR HANDLING FAILED INVOICE */}
      {/*{failed && (*/}
      {/*  <BillingOpenFailedInvoice className="mb-4" organisationId={organisationId} updateLatestInvoice={updateLatestInvoice} />*/}
      {/*)}*/}
      {/* BUTTON (FOR SHOW ALL) */}
      {latestInvoice && (
        <BillingOpenInvoices />
      )}
    </div>
  )
}

const BillingInvoiceSummary = ({
  latestInvoice,
  upcomingInvoice,
  organisationId,
  updateLatestInvoice,
  className,
}) => {
  const initSelectedInvoiceName = upcomingInvoice && upcomingInvoice.paymentStatus !== 'paid' ? 'upcoming' : 'latest'
  const [selectedInvoiceName, setSelectedInvoiceName] = React.useState(initSelectedInvoiceName)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >

      <BILLING_INVOICE_SUMMARY_HEADER
        latestInvoicePaymentStatus={latestInvoice.paymentStatus}
        latestInvoiceDueDate={moment(latestInvoice.period_end).add(2, 'day')}
        upcomingInvoiceDueDate={moment(upcomingInvoice.period_end).add(2, 'day')}
        upcomingInvoiceSpendAndFee={upcomingInvoice.serviceFeePlusAdSpend}
      />

      <BILLING_PERIOD_OPTIONS
        noLatestInvoiceOrIsPaid={!latestInvoice || latestInvoice.paymentStatus === 'paid'}
        latestInvoicePeriod={{ start: latestInvoice.period_start, end: latestInvoice.period_end}}
        upcomingInvoicePeriod={{ start: upcomingInvoice.period_start, end: upcomingInvoice.period_end}}
        upcomingInvoiceSpendAndFee={upcomingInvoice.serviceFeePlusAdSpend}
        selectedInvoiceName={selectedInvoiceName}
        setSelectedInvoiceName={setSelectedInvoiceName}
      />

      <SELECTED_INVOICE
        invoice={selectedInvoiceName === 'upcoming' ? upcomingInvoice : latestInvoice}
      />

      <INVOICE_SUMMARY_BUTTON
        latestInvoice={latestInvoice}
        latestInvoiceSelected={selectedInvoiceName === 'latest'}
        outstandingAmount={latestInvoice.paymentStatus === 'failed' && latestInvoice.totalFee}
        invoiceUrl={latestInvoice.invoiceUrl}
      />

    </div>
  )
}

BillingInvoiceSummary.propTypes = {
  upcomingInvoice: PropTypes.object,
  latestInvoice: PropTypes.object,
  organisationId: PropTypes.string.isRequired,
  updateLatestInvoice: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingInvoiceSummary.defaultProps = {
  upcomingInvoice: {},
  latestInvoice: {},
  className: null,
}

export default BillingInvoiceSummary
