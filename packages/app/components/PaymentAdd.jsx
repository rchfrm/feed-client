// IMPORT PACKAGES
import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'


import BillingAddPaymentForm from '@/app/BillingAddPaymentForm'
// import PaymentAddForm from '@/app/PaymentAddForm_old' // OLD FORM

import PaymentPageSuccess from '@/app/PaymentPageSuccess'

import styles from '@/app/PaymentPage.module.css'
import sidePanelStyles from '@/app/SidePanel.module.css'

const PaymentAdd = () => {
  // Create the Stripe object yourself...
  const stripePromise = loadStripe(process.env.stripe_provider)

  const [success, setSuccess] = React.useState(false)
  const [cardDetails, setCardDetails] = React.useState({})

  return (

    <section className={styles.PaymentAdd}>

      <h2 className={sidePanelStyles.SidePanel__Header}>Enter your card details</h2>

      <div>
        {
          !success
            ? (
              <Elements stripe={stripePromise}>
                <BillingAddPaymentForm
                  setSuccess={setSuccess}
                  setCardDetails={setCardDetails}
                />
              </Elements>
            )
            : <PaymentPageSuccess cardDetails={cardDetails} />
        }
      </div>

    </section>
  )
}

export default PaymentAdd
