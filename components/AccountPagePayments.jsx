import React from 'react'
import PropTypes from 'prop-types'

import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'

import PaymentAdd from './PaymentAdd'

import Button from './elements/Button'
import PaymentMethodButton from './PaymentMethodButton'

import styles from './PaymentPage.module.css'

function AccountPagePayments() {
  // Get Billing Context
  const { billingDetails } = React.useContext(BillingContext)
  // Get Side panel context
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  // Get account owner billing details
  const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')
  // Get all payment methods that aren't the default
  const alternativePaymentMethods = allPaymentMethods.filter(({ is_default }) => !is_default)
  // Put default method first
  const paymentMethodsSorted = React.useRef([defaultMethod, ...alternativePaymentMethods])
  // Get ID of default method
  const { id: initialDefaultMethodId } = defaultMethod
  const [defaultMethodId, setDefaultMethodId] = React.useState(initialDefaultMethodId)
  console.log('defaultMethod', defaultMethod)
  console.log('allPaymentMethods', allPaymentMethods)
  console.log('alternativePaymentMethods', alternativePaymentMethods)

  // HANDLE CLICK ON METHOD
  const onButtonClick = (clickedId) => {
    setDefaultMethodId(clickedId)
  }

  // GO TO CHECKOUT PAGE
  const goToCheckout = () => {
    const content = <PaymentAdd closePanel={toggleSidePanel} />
    setSidePanelContent(content)
  }

  return (
    <section className={styles.AccountPagePayments}>

      <h2 className={styles.AccountPagePayments__header}>Payment Methods</h2>

      <div className={styles.AccountPagePayments__allMethods}>
        {/* ALL PAYMENT METHODS */}
        {paymentMethodsSorted.current.map((method) => {
          const { id, is_default } = method
          return (
            <PaymentMethodButton
              key={id}
              method={method}
              isDefault={is_default}
              defaultMethodId={defaultMethodId}
              onClick={onButtonClick}
            />
          )
        })}
      </div>

      {/* ADD PAYMENT METHOD BUTTON */}
      <div className={styles.AccountPagePayments__addPayment}>
        <Button
          className="button--black  button--small"
          onClick={goToCheckout}
        >
          + Add new payment method
        </Button>
      </div>

    </section>
  )
}

AccountPagePayments.propTypes = {
  closePanel: PropTypes.func.isRequired,
}

export default AccountPagePayments
