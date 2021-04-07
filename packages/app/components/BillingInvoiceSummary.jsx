import React from 'react'
import PropTypes from 'prop-types'

const BillingInvoiceSummary = ({
  nextInvoice,
  className,
}) => {
  console.log('nextInvoice', nextInvoice)
  const { date } = nextInvoice
  const header = `Next invoice: ${date}`
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3 className="font-body font-bold mb-6">{header}</h3>
    </div>
  )
}

BillingInvoiceSummary.propTypes = {
  nextInvoice: PropTypes.object.isRequired,
  className: PropTypes.string,
}

BillingInvoiceSummary.defaultProps = {
  className: null,
}

export default BillingInvoiceSummary
