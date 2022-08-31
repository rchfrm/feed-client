import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const BillingInvoiceSummaryPeriodOptions = ({
  periodStart,
  periodEnd,
}) => {
  const formatDateRange = (startDate, endDate) => {
    startDate = moment(startDate).format('D MMMM')
    endDate = moment(endDate).format('D MMMM YYYY')
    return `${startDate} - ${endDate}`
  }

  return (
    <div className="flex mb-10">
      <p className="mb-0 mr-1">Billing period:</p>
      <p className="mb-0 font-bold">{formatDateRange(periodStart, periodEnd)}</p>
    </div>
  )
}

BillingInvoiceSummaryPeriodOptions.propTypes = {
  periodStart: PropTypes.string,
  periodEnd: PropTypes.string,
}

BillingInvoiceSummaryPeriodOptions.defaultProps = {
  periodStart: '',
  periodEnd: '',
}

export default BillingInvoiceSummaryPeriodOptions
