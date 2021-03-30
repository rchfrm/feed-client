import React from 'react'
import PropTypes from 'prop-types'

const BillingAddPaymentForm = ({
  isFormValid,
  setIsFormValid,
  cardDetails,
  setCardDetails,
  billingDetails,
  setBillingDetails,
  isLoading,
  onSubmit,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        Form
      </form>
    </div>
  )
}

BillingAddPaymentForm.propTypes = {
  isFormValid: PropTypes.bool.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  cardDetails: PropTypes.object.isRequired,
  setCardDetails: PropTypes.func.isRequired,
  billingDetails: PropTypes.object.isRequired,
  setBillingDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingAddPaymentForm.defaultProps = {
  className: null,
}

export default BillingAddPaymentForm
