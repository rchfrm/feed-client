import React from 'react'
import PropTypes from 'prop-types'

import { AuthContext } from './contexts/Auth'
import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'

import Button from './elements/Button'
import Error from './elements/Error'

import PaymentAdd from './PaymentAdd'
import PaymentMethodButton from './PaymentMethodButton'

import paymentHelpers from './helpers/paymentHelpers'

import styles from './PaymentPage.module.css'

function AccountPagePayments() {
  // Get User context
  const { getToken } = React.useContext(AuthContext)
  // Get Billing Context
  const {
    billingDetails,
    fetchBillingDetails,
    organisation: { id: organisationId },
  } = React.useContext(BillingContext)
  // Get Side panel context
  const { setSidePanelContent, toggleSidePanel, setSidePanelLoading } = React.useContext(SidePanelContext)
  // Get account owner billing details
  const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')
  // Get all payment methods that aren't the default
  const alternativePaymentMethods = allPaymentMethods.filter(({ is_default }) => !is_default)
  // Put default method first
  const paymentMethodsSorted = React.useRef([defaultMethod, ...alternativePaymentMethods])
  // Get ID of default method
  const { id: initialDefaultMethodId } = defaultMethod
  const [defaultMethodId, setDefaultMethodId] = React.useState(initialDefaultMethodId)
  const [newDefaultMethod, setNewDefaultMethod] = React.useState(false)
  // Error
  const [error, setError] = React.useState(null)

  // HANDLE CLICK ON METHOD
  const onSelectNewDefault = (clickedId) => {
    setDefaultMethodId(clickedId)
    const hasNewMethod = clickedId !== initialDefaultMethodId
    setNewDefaultMethod(hasNewMethod)
  }

  // GO TO CHECKOUT PAGE
  const goToCheckout = () => {
    const content = <PaymentAdd closePanel={toggleSidePanel} />
    setSidePanelContent(content)
  }

  // HANDLE SET AS DEFAULT
  const setAsDefault = async () => {
    setError(null)
    setSidePanelLoading(true)
    // Get token
    const verifyToken = await getToken()
    // Set default
    const updatePaymentResult = await paymentHelpers.setPaymentAsDefault(organisationId, defaultMethodId, verifyToken)
      // Handle error
      .catch((err) => {
        setError(err)
        setDefaultMethodId(initialDefaultMethodId)
      })
    if (!updatePaymentResult) {
      setSidePanelLoading(false)
      return
    }
    // Update billing details context
    await fetchBillingDetails()
    // Stop loading state
    setSidePanelLoading(false)
  }

  return (
    <section className={styles.AccountPagePayments}>

      <h2 className={styles.AccountPagePayments__header}>Payment Methods</h2>

      {error && (
        <div className={styles.AccountPagePayments__error}>
          <Error error={error} />
        </div>
      )}

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
              onClick={onSelectNewDefault}
            />
          )
        })}
      </div>

      {/* ADD PAYMENT METHOD BUTTON */}
      <div className={styles.AccountPagePayments__addPayment}>
        <Button
          className="button--small"
          onClick={goToCheckout}
        >
          + Add new payment method
        </Button>
      </div>

      {/* SAVE NEW DEFAULT BUTTON */}
      <div className={styles.AccountPagePayments__saveDefault}>
        <Button
          version="green"
          onClick={setAsDefault}
          disabled={!newDefaultMethod}
        >
          Update default method
        </Button>
      </div>

    </section>
  )
}

AccountPagePayments.propTypes = {
  closePanel: PropTypes.func.isRequired,
}

export default AccountPagePayments
