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
  buttonText,
  className,
  buttonClassName,
}) => {
  const openAddPaymentMethod = useBillingAddPayment()
  const openShowPaymentMethods = useBillingShowPayments()

  const { id: organisationId } = useBillingStore(getOrganisation)

  return (
    <div className={className}>
      <Button
        version="black small"
        className={buttonClassName}
        label={buttonText}
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
        {buttonText}
      </Button>
    </div>
  )
}

BillingOpenPayments.propTypes = {
  contentType: PropTypes.string.isRequired,
  shouldBeDefault: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
}

BillingOpenPayments.defaultProps = {
  shouldBeDefault: false,
  className: null,
  buttonClassName: 'w-full',
}


export default BillingOpenPayments
