import React from 'react'

import BillingPaymentCard from '@/app/BillingPaymentCard'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/billingCopy'

// PAYMENT SUCCESS
const PaymentPageSuccess = ({ paymentMethod }) => {
  console.log('SUCCESS', paymentMethod)
  const {
    card,
    billing_details: billingDetails,
    setAsDefault,
  } = paymentMethod
  return (
    <div>
      <MarkdownText markdown={copy.addMethodSucess(paymentMethod.setAsDefault)} />
      <BillingPaymentCard
        card={card}
        billingDetails={billingDetails}
        isDefault={setAsDefault}
      />
    </div>
  )
}

export default PaymentPageSuccess
