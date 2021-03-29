import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/billingCopy'

const BillingPaymentMethods = ({
  paymentMethods,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3>Payment Methods</h3>
      {paymentMethods.length ? (
        <div>METHODS</div>
      ) : (
        <MarkdownText markdown={copy.noPaymentMethods} />
      )}
    </div>
  )
}

BillingPaymentMethods.propTypes = {
  paymentMethods: PropTypes.array.isRequired,
  className: PropTypes.string,
}

BillingPaymentMethods.defaultProps = {
  className: null,
}

export default BillingPaymentMethods
