import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import BillingPaymentMethodsAll from '@/app/BillingPaymentMethodsAll'
import BillingPaymentAdd from '@/app/BillingPaymentAdd'

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
      <h2 className="font-body font-bold mb-6">Payment Methods</h2>
      <div className="mb-10">
        {defaultPaymentMethod ? (
          <BillingPaymentMethodsAll />
        ) : (
          <MarkdownText markdown={copy.noPaymentMethods} />
        )}
        <BillingPaymentAdd
          shouldBeDefault={!defaultPaymentMethod}
        />
      </div>
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
