import React from 'react'
import PropTypes from 'prop-types'

import useBillingStore from '@/app/stores/billingStore'

const getBillingDetails = state => state.billingDetails

const BillingPaymentMethodsAll = ({ className }) => {
  const billingDetails = useBillingStore(getBillingDetails)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      ALL METHODS
    </div>
  )
}

BillingPaymentMethodsAll.propTypes = {
  className: PropTypes.string,
}

BillingPaymentMethodsAll.defaultProps = {
  className: null,
}

export default BillingPaymentMethodsAll
