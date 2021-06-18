import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import BillingOpenFailedInvoice from '@/app/BillingOpenFailedInvoice'
import BillingOpenInvoices from '@/app/BillingOpenInvoices'

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
  latestInvoiceId,
  latestInvoicePeriod,
  upcomingInvoiceId,
  upcomingInvoicePeriod,
  upcomingInvoiceSpendAndFee,
  selectedInvoiceId,
}) => {
  if (noLatestInvoiceOrIsPaid && upcomingInvoiceSpendAndFee === 0) return <></>

  const LATEST = () => {
    if (noLatestInvoiceOrIsPaid) return <></>
    const selected = selectedInvoiceId === latestInvoiceId
    return (
      <p className={`mb-0 pr-3 ${selected && 'font-bold black--underline'}`}>
        {formatDateRange(latestInvoicePeriod.start, latestInvoicePeriod.end)}
      </p>
    )
  }
  const UPCOMING = () => {
    const selected = selectedInvoiceId === upcomingInvoiceId
    return (
      <p className={`mb-0 ${selected && 'font-bold'} ${!noLatestInvoiceOrIsPaid && 'black--underline'}`}>
        {formatDateRange(upcomingInvoicePeriod.start, upcomingInvoicePeriod.end)}
      </p>
    )
  }
  return (
    <div className="flex">
      <p className="mb-0 pr-3">Billing period:</p>
      <LATEST />
      <UPCOMING />
    </div>
  )
}

const BillingInvoiceSummary = ({
  latestInvoice,
  upcomingInvoice,
  hasLatestInvoice,
  organisationId,
  updateLatestInvoice,
  className,
}) => {
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
        latestInvoiceId={latestInvoice.id}
        latestInvoicePeriod={{ start: latestInvoice.period_start, end: latestInvoice.period_end}}
        upcomingInvoiceId={upcomingInvoice.id}
        upcomingInvoicePeriod={{ start: upcomingInvoice.period_start, end: upcomingInvoice.period_end}}
        upcomingInvoiceSpendAndFee={upcomingInvoice.serviceFeePlusAdSpend}
        selectedInvoiceId={upcomingInvoice.id}
      />


      {/*{failed && (*/}
      {/*  <h4 className="font-body font-bold mb-2">{date}</h4>*/}
      {/*)}*/}
      {/*<h3 className={`font-body font-bold mb-6 ${failed ? 'text-red' : null}`}>{header}</h3>*/}
      {/*/!* INVOICE SECTIONS *!/*/}
      {/*{invoiceSections.map((section, index) => {*/}
      {/*  return (*/}
      {/*    <ul key={index} className="bg-grey-1 rounded-dialogue p-5 mb-5">*/}
      {/*      {section.map(({ slug, title, value }, index) => {*/}
      {/*        const lastItem = index === section.length - 1*/}
      {/*        const TextEl = lastItem ? 'strong' : 'span'*/}
      {/*        return (*/}
      {/*          <React.Fragment key={slug}>*/}
      {/*            {lastItem && (*/}
      {/*              <div className="w-full bg-black my-4" style={{ height: 1 }} />*/}
      {/*            )}*/}
      {/*            <li key={slug} className="flex justify-between mb-3 last:mb-0">*/}
      {/*              <TextEl>{title}</TextEl>*/}
      {/*              <TextEl>{value}</TextEl>*/}
      {/*            </li>*/}
      {/*          </React.Fragment>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </ul>*/}
      {/*  )*/}
      {/*})}*/}
      {/*/!* TOTAL *!/*/}
      {/*{invoice.id && (*/}
      {/*  <p*/}
      {/*    className={[*/}
      {/*      'text-lg',*/}
      {/*      'flex justify-between mb-0 py-3 px-5',*/}
      {/*      'border-solid border-2 border-green rounded-dialogue',*/}
      {/*    ].join(' ')}*/}
      {/*  >*/}
      {/*    <strong>TOTAL FEE</strong>*/}
      {/*    <strong>{totalFee}</strong>*/}
      {/*  </p>*/}
      {/*)}*/}
      {/*<div className="pt-6">*/}
      {/*  /!* BUTTON FOR HANDLING FAILED INVOICE *!/*/}
      {/*  {failed && (*/}
      {/*    <BillingOpenFailedInvoice className="mb-4" organisationId={organisationId} updateLatestInvoice={updateLatestInvoice} />*/}
      {/*  )}*/}
      {/*  /!* BUTTON (FOR SHOW ALL) *!/*/}
      {/*  {hasLatestInvoice && (*/}
      {/*    <BillingOpenInvoices />*/}
      {/*  )}*/}
      {/*</div>*/}
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
