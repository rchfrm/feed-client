import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useBillingShowPayments from '@/app/hooks/useBillingShowPayments'
import useBillingAddPayment from '@/app/hooks/useBillingAddPayment'

import useBillingStore from '@/app/stores/billingStore'

import { track } from '@/app/helpers/trackingHelpers'

const getOrganisation = state => state.organisation

const BillingOpenPayments = ({
  contentType,
  shouldBeDefault,
  className,
}) => {
  const openAddPaymentMethod = useBillingAddPayment()
  const openShowPaymentMethods = useBillingShowPayments()

  const { id: organisationId } = useBillingStore(getOrganisation)

  return (
    <div className={className}>
      <Button
        version="black small"
        className="w-full sm:max-w-md"
        onClick={(e) => {
          e.preventDefault()
          if (contentType === 'add-payment') {
            openAddPaymentMethod(shouldBeDefault)
            track('billing_start_add_payment', { organisationId })
          } else {
            openShowPaymentMethods()
            track('billing_view_payment_methods', { organisationId })
          }
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
