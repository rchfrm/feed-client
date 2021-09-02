import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const BillingInvoiceSummaryPeriodOptions = ({
  noLatestInvoiceOrIsPaid,
  latestInvoicePeriod,
  upcomingInvoicePeriod,
  upcomingInvoiceSpendAndFee,
  selectedInvoiceName,
  setSelectedInvoiceName,
}) => {
  if (noLatestInvoiceOrIsPaid && !upcomingInvoiceSpendAndFee) return null

  const formatDateRange = (startDate, endDate) => {
    startDate = moment(startDate).format('D')
    endDate = moment(endDate).format('D MMM YY')
    return `${startDate} - ${endDate}`
  }

  const LATEST_PERIOD_OPTION = () => {
    if (noLatestInvoiceOrIsPaid) return null
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
  const UPCOMING_PERIOD_OPTION = () => {
    if (!upcomingInvoiceSpendAndFee) return null
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
      <LATEST_PERIOD_OPTION />
      <UPCOMING_PERIOD_OPTION />
    </div>
  )
}

BillingInvoiceSummaryPeriodOptions.propTypes = {
  noLatestInvoiceOrIsPaid: PropTypes.bool.isRequired,
  latestInvoicePeriod: PropTypes.object.isRequired,
  upcomingInvoicePeriod: PropTypes.object.isRequired,
  upcomingInvoiceSpendAndFee: PropTypes.number,
  selectedInvoiceName: PropTypes.string.isRequired,
  setSelectedInvoiceName: PropTypes.func.isRequired,
}

BillingInvoiceSummaryPeriodOptions.defaultProps = {
  upcomingInvoiceSpendAndFee: 0,
}

export default BillingInvoiceSummaryPeriodOptions
