import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useBillingShowPayments from '@/app/hooks/useBillingShowPayments'
import useBillingAddPayment from '@/app/hooks/useBillingAddPayment'

const BillingOpenPayments = ({
  contentType,
  shouldBeDefault,
  className,
}) => {
  const openAddPaymentMethod = useBillingAddPayment()
  const openShowPaymentMethods = useBillingShowPayments()

  return (
    <div className={className}>
      <Button
        version="black small"
        className="w-full sm:max-w-md"
        onClick={(e) => {
          e.preventDefault()
          if (contentType === 'add-payment') {
            openAddPaymentMethod(shouldBeDefault)
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
  shouldBeDefault: PropTypes.bool,
  className: PropTypes.string,
}

BillingOpenPayments.defaultProps = {
  shouldBeDefault: false,
  className: null,
}


export default BillingOpenPayments
