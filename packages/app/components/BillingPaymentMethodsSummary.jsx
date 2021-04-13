import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import BillingOpenPayments from '@/app/BillingOpenPayments'
import BillingPaymentCard from '@/app/BillingPaymentCard'

import copy from '@/app/copy/billingCopy'

const BillingPaymentMethodsSummary = ({
  defaultPaymentMethod,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3 className="font-body font-bold mb-6">Payment Methods</h3>
      {defaultPaymentMethod ? (
        <>
          <BillingPaymentCard
            card={defaultPaymentMethod.card}
            billingDetails={defaultPaymentMethod.billing_details}
            isDefault
            className="mb-6"
          />
          <BillingOpenPayments contentType="show-methods" />
        </>
      ) : (
        <>
          <MarkdownText markdown={copy.noPaymentMethods} />
          <BillingOpenPayments contentType="add-payment" shouldBeDefault />
        </>
      )}
    </div>
  )
}

BillingPaymentMethodsSummary.propTypes = {
  defaultPaymentMethod: PropTypes.object,
  className: PropTypes.string,
}

BillingPaymentMethodsSummary.defaultProps = {
  defaultPaymentMethod: null,
  className: null,
}

export default BillingPaymentMethodsSummary
