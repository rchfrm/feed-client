import React from 'react'
import PropTypes from 'prop-types'

import usePrevious from 'use-previous'

import { AuthContext } from './contexts/Auth'
import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'

import Button from './elements/Button'
import Error from './elements/Error'

import PaymentAdd from './PaymentAdd'
import PaymentMethodButton from './PaymentMethodButton'

import paymentHelpers from './helpers/paymentHelpers'

import styles from './PaymentPage.module.css'


const SidePanelButton = (setAsDefault) => {
  return (
    <Button
      version="green"
      onClick={setAsDefault}
    >
      Update default method
    </Button>
  )
}

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
  const {
    setSidePanelContent,
    toggleSidePanel,
    setSidePanelLoading,
    setSidePanelButton,
  } = React.useContext(SidePanelContext)
  // Get account owner billing details
  const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')
  // Get all payment methods that aren't the default
  const alternativePaymentMethods = allPaymentMethods.filter(({ is_default }) => !is_default)
  // Put default method first
  const paymentMethodsSorted = React.useRef([defaultMethod, ...alternativePaymentMethods])
  // Get ID of default method
  const { id: initialDefaultMethodId } = defaultMethod
  const [defaultMethodId, setDefaultMethodId] = React.useState(initialDefaultMethodId)
  // Toggling whether new method is selected
  const [hasNewMethod, setHasNewMethod] = React.useState(false)
  // Error
  const [error, setError] = React.useState(null)

  console.log('account page mount')


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
    // Hide update button
    setHasNewMethod(false)
    // Stop loading state
    setSidePanelLoading(false)
  }

  // HANDLE CLICK ON METHOD
  const previousHasNewMethod = usePrevious(hasNewMethod)
  const onSelectNewDefault = (clickedId) => {
    setDefaultMethodId(clickedId)
    setHasNewMethod(clickedId !== initialDefaultMethodId)
  }

  // TOGGLE SIDEBAR BUTTON based on whether new method is selected
  React.useEffect(() => {
    if (hasNewMethod === previousHasNewMethod) return
    // If new method selected, show side panel button
    const button = hasNewMethod
      ? SidePanelButton(setAsDefault)
      : null
    setSidePanelButton(button)
    // Clean up
    return () => {
      setSidePanelButton(null)
    }
  }, [hasNewMethod])

  // GO TO CHECKOUT PAGE
  const goToCheckout = () => {
    const content = <PaymentAdd closePanel={toggleSidePanel} />
    setSidePanelContent(content)
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

    </section>
  )
}

AccountPagePayments.propTypes = {
  closePanel: PropTypes.func.isRequired,
}

export default AccountPagePayments
