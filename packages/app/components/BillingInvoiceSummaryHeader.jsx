import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const BillingInvoiceSummaryHeader = ({ dueDate }) => {
  const formatDate = date => moment(date).format('DD MMMM YYYY')

  const getHeader = () => {
    return `Next invoice: ${formatDate(dueDate)}`
  }

  return <h2 className="font-body font-bold mb-10">{getHeader()}</h2>
}

BillingInvoiceSummaryHeader.propTypes = {
  dueDate: PropTypes.string,
}

BillingInvoiceSummaryHeader.defaultProps = {
  dueDate: '',
}

export default BillingInvoiceSummaryHeader
