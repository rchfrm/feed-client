import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import BillingOpenFailedInvoice from '@/app/BillingOpenFailedInvoice'
import BillingOpenInvoices from '@/app/BillingOpenInvoices'
import Button from '@/elements/Button'
import ButtonPill from '@/elements/ButtonPill'

const getHeader = (date, failed) => {
  if (!date) return 'No upcoming invoice'
  if (failed) return 'There was a problem paying your last invoice'
  return `Next invoice: ${date}`
}

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
    <div className="flex pb-5">
      <p className="mb-0 mr-3">Billing period:</p>
      <LATEST />
      <UPCOMING />
    </div>
  )
}

const SELECTED_INVOICE = ({ invoice }) => {
  return (
    <>
      <span className={`py-2 px-4 rounded-full ${invoice.paymentStatus === 'failed' ? 'text-white bg-red font-bold' : 'bg-grey-2'}`}>{invoice.paymentStatus}</span>
    </>
  )
}

const INVOICE_SUMMARY_BUTTON = ({
  latestInvoice,
}) => {
  return (
    <div className="pt-6">
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
