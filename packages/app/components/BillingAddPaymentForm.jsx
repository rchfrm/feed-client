import React from 'react'
import PropTypes from 'prop-types'

const BillingAddPaymentForm = ({
  setSuccess,
  setCardDetails,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      FORM
    </div>
  )
}

BillingAddPaymentForm.propTypes = {
  setSuccess: PropTypes.func.isRequired,
  setCardDetails: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingAddPaymentForm.defaultProps = {
  className: null,
}

export default BillingAddPaymentForm
