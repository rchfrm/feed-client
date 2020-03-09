import React from 'react'
import PropTypes from 'prop-types'

import { BillingContext } from './contexts/BillingContext'

import PaymentMethodButton from './PaymentMethodButton'

import styles from './AccountPage.module.css'

function AccountPagePayments({ closePanel }) {
  const { hasNoPaymentMethod, billingDetails } = React.useContext(BillingContext)
  const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')
  // Get all payment methods that aren't the default
  const alternativePaymentMethods = allPaymentMethods.filter(({ is_default }) => !is_default)
  // Put default method first
  const paymentMethodsSorted = [defaultMethod, ...alternativePaymentMethods]
  console.log('defaultMethod', defaultMethod)
  console.log('allPaymentMethods', allPaymentMethods)
  console.log('alternativePaymentMethods', alternativePaymentMethods)

  return (
    <section className={styles.paymentsOverview}>

      <h2 className={styles.paymentsOverview__header}>Payment Methods</h2>

      {paymentMethodsSorted.map((method) => {
        const { id, is_default } = method
        return (
          <PaymentMethodButton
            key={id}
            method={method}
            isDefault={is_default}
          />
        )
      })}

    </section>
  )
}

AccountPagePayments.propTypes = {
  closePanel: PropTypes.func.isRequired,
}

export default AccountPagePayments
