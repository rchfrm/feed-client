import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const BillingInvoiceSummaryHeader = ({ upcomingInvoice }) => {
  const formatDate = date => moment(date).format('DD MMMM YYYY')

  const getHeader = () => {
    if (!upcomingInvoice) {
      return 'Nothing to pay!'
    }

    return `Next invoice: ${formatDate(upcomingInvoice.periodEnd)}`
  }

  return <h2 className="font-body font-bold mb-10">{getHeader()}</h2>
}

BillingInvoiceSummaryHeader.propTypes = {
  upcomingInvoice: PropTypes.object,
}

BillingInvoiceSummaryHeader.defaultProps = {
  upcomingInvoice: null,
}

export default BillingInvoiceSummaryHeader
