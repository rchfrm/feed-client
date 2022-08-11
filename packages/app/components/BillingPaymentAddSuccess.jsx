import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/billingCopy'

// PAYMENT SUCCESS
const BillingPaymentAddSuccess = ({ paymentMethod }) => {
  const { is_default } = paymentMethod

  return (
    <MarkdownText markdown={copy.addMethodSuccess(is_default)} />
  )
}

export default BillingPaymentAddSuccess
