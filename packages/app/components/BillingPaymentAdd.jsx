import React from 'react'
import PropTypes from 'prop-types'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Button from '@/elements/Button'

import BillingAddPaymentForm from '@/app/BillingAddPaymentForm'
// import PaymentAddForm from '@/app/PaymentAddForm_old' // OLD FORM

import PaymentPageSuccess from '@/app/PaymentPageSuccess'

import styles from '@/app/PaymentPage.module.css'
import sidePanelStyles from '@/app/SidePanel.module.css'

// Create the Stripe object yourself...
const stripePromise = loadStripe(process.env.stripe_provider)

// ADD PAYMENT FUNCTION
const postPaymentMethod = async (paymentDetails) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paymentDetails)
    }, 500)
  })
}

const BillingPaymentAdd = ({
  setSidePanelButton,
  toggleSidePanel,
}) => {
  const [success, setSuccess] = React.useState(false)
  const [cardDetails, setCardDetails] = React.useState({})
  const [billingDetails, setBillingDetails] = React.useState({})

  // HANDLE FORM
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const onSubmit = React.useCallback(async () => {
    if (!isFormValid) return
    const paymentDetails = { ...billingDetails, ...cardDetails }
    setIsLoading(true)
    const { res, error } = await postPaymentMethod(paymentDetails)
    console.log('res', res)
    setIsLoading(false)
    if (!error) {
      setSuccess(true)
    }
  }, [isFormValid, billingDetails, cardDetails])

  // CHANGE SIDEPANEL BUTTON
  React.useEffect(() => {
    if (success) {
      const button = <Button version="green" onClick={() => toggleSidePanel(false)} />
      setSidePanelButton(button)
      return
    }
    const button = <Button version="green" disabled={!isFormValid} onClick={onSubmit} />
    setSidePanelButton(button)
  }, [success, isFormValid, onSubmit, setSidePanelButton, toggleSidePanel])

  return (

    <section className={styles.PaymentAdd}>

      <h2 className={sidePanelStyles.SidePanel__Header}>Enter your card details</h2>

      <div>
        {success ? <PaymentPageSuccess cardDetails={cardDetails} /> : (
          <Elements stripe={stripePromise}>
            <BillingAddPaymentForm
              isFormValid={isFormValid}
              setIsFormValid={setIsFormValid}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              billingDetails={billingDetails}
              setBillingDetails={setBillingDetails}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </Elements>
        )}
      </div>

    </section>
  )
}

BillingPaymentAdd.propTypes = {
  setSidePanelButton: PropTypes.func.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
}

export default BillingPaymentAdd
