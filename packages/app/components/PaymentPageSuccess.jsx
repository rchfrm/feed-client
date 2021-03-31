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
    is_default,
  } = paymentMethod
  return (
    <div>
      <MarkdownText markdown={copy.addMethodSucess(is_default)} />
      <div>
        <BillingPaymentCard
          card={card}
          billingDetails={billingDetails}
          isDefault={is_default}
        />
      </div>
    </div>
  )
}

export default PaymentPageSuccess
