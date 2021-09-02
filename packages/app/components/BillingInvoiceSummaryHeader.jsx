import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const BillingInvoiceSummaryHeader = ({
  latestInvoicePaymentStatus,
  latestInvoiceDueDate,
  upcomingInvoiceDueDate,
  upcomingInvoiceSpendAndFee,
}) => {
  const formatDate = date => moment(date).format('DD MMMM YYYY')

  const getHeader = () => {
    if (latestInvoicePaymentStatus === 'failed') {
      return 'Invoice overdue'
    }
    if (!upcomingInvoiceSpendAndFee) {
      return 'Nothing to pay!'
    }
    if (latestInvoicePaymentStatus === 'paid' && upcomingInvoiceDueDate) {
      return `Next payment: ${formatDate(upcomingInvoiceDueDate)}`
    }
    return `Next payment: ${formatDate(latestInvoiceDueDate)}`
  }

  return <h3 className="font-body font-bold mb-6">{getHeader()}</h3>
}

BillingInvoiceSummaryHeader.propTypes = {
  latestInvoicePaymentStatus: PropTypes.string,
  latestInvoiceDueDate: PropTypes.object,
  upcomingInvoiceDueDate: PropTypes.object,
  upcomingInvoiceSpendAndFee: PropTypes.number,
}

BillingInvoiceSummaryHeader.defaultProps = {
  latestInvoicePaymentStatus: '',
  upcomingInvoiceSpendAndFee: 0,
  latestInvoiceDueDate: undefined,
  upcomingInvoiceDueDate: undefined,
}

export default BillingInvoiceSummaryHeader
