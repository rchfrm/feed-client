import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useBillingShowPayments from '@/app/hooks/useBillingShowPayments'
import useBillingAddPayment from '@/app/hooks/useBillingAddPayment'

const BillingOpenPayments = ({
  contentType,
  setAsDefault,
  className,
}) => {
  const openAddPaymentMethod = useBillingAddPayment()
  const openShowPaymentMethods = useBillingShowPayments()

  return (
    <div className={className}>
      <Button
        version="black small"
        className="w-full max-w-md"
        onClick={(e) => {
          e.preventDefault()
          if (contentType === 'add-payment') {
            openAddPaymentMethod(setAsDefault)
            return
          }
          openShowPaymentMethods()
        }}
      >
        {contentType === 'add-payment' ? 'Add payment method' : 'Show all payment methods'}
      </Button>
    </div>
  )
}

BillingOpenPayments.propTypes = {
  contentType: PropTypes.string.isRequired,
  setAsDefault: PropTypes.bool,
  className: PropTypes.string,
}

BillingOpenPayments.defaultProps = {
  setAsDefault: false,
  className: null,
}


export default BillingOpenPayments
