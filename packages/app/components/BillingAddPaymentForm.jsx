import React from 'react'
import PropTypes from 'prop-types'

import { loadStripe } from '@stripe/stripe-js'

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'


const STRIPE_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

// UPDATE DB
const postPaymentMethod = async (paymentMethod, { name, postalCode }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ paymentMethod, name, postalCode })
    }, 500)
  })
}

// THE FORM
const FORM = ({ setSidePanelButton, setSuccess }) => {
  const elements = useElements()
  const stripe = useStripe()
  const [name, setName] = React.useState('')
  const [postalCode, setPostalCode] = React.useState('')
  const [error, setError] = React.useState(null)
  const [paymentMethod, setPaymentMethod] = React.useState(null)

  // FORM STATE
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  // WAIT FOR STRIPE TO LOAD
  React.useEffect(() => {
    if (!stripe || !elements) {
      setIsLoading(true)
      return
    }
    setIsLoading(false)
  }, [elements, stripe])

  // TEST FORM IS VALID
  React.useEffect(() => {
    const formValid = !!(name && postalCode && elements && stripe)
    setIsFormValid(formValid)
  }, [name, postalCode, elements, stripe])

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (!isFormValid || isLoading) return
    setIsLoading(true)
    const cardElement = elements.getElement(CardNumberElement)
    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        address: {
          postal_code: postalCode,
        },
      },
    })
    if (stripeError) {
      setError(stripeError)
      setIsLoading(false)
      return
    }
    console.log('paymentMethod', paymentMethod)
    const { res, error } = await postPaymentMethod(paymentMethod, { name, postalCode })
    console.log('res', res)
    setIsLoading(false)
    if (!error) {
      setSuccess(true)
    }
  }, [isFormValid, isLoading, name, postalCode, setSuccess, stripe, elements])

  // CHANGE SIDEPANEL BUTTON
  React.useEffect(() => {
    const button = <Button version="green" disabled={!isFormValid} onClick={onSubmit}>Submit</Button>
    setSidePanelButton(button)
  }, [isFormValid, onSubmit, setSidePanelButton])

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      <Error error={error} />

      {/* NAME */}
      <Input
        label="Full name"
        value={name}
        updateValue={setName}
      />

      <label htmlFor="cardNumber">Card Number</label>
      <CardNumberElement
        id="cardNumber"
        onChange={(e) => {
          console.log('change stripe', e)
        }}
        options={STRIPE_ELEMENT_OPTIONS}
      />
      <label htmlFor="expiry">Card Expiration</label>
      <CardExpiryElement
        id="expiry"
        onChange={(e) => {
          console.log('change stripe', e)
        }}
        options={STRIPE_ELEMENT_OPTIONS}
      />
      <label htmlFor="cvc">CVC</label>
      <CardCvcElement
        id="cvc"
        onChange={(e) => {
          console.log('change stripe', e)
        }}
        options={STRIPE_ELEMENT_OPTIONS}
      />

      {/* POSTAL CODE */}
      <Input
        label="Postal Code"
        value={postalCode}
        updateValue={setPostalCode}
      />

      {/* HIDE BUTTON BECAUSE IT IS IN SIDEPANEL */}
      <button type="submit" disabled={!stripe} className="absolute" style={{ left: '-1000em' }}>
        Pay
      </button>
    </form>
  )
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.stripe_provider)

const BillingAddPaymentForm = ({
  setSidePanelButton,
  setSuccess,
}) => {
  return (
    <Elements stripe={stripePromise}>
      {/* Defined above... */}
      <FORM
        setSidePanelButton={setSidePanelButton}
        setSuccess={setSuccess}
      />
    </Elements>
  )
}

BillingAddPaymentForm.propTypes = {
  setSidePanelButton: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
}

BillingAddPaymentForm.defaultProps = {
}

export default BillingAddPaymentForm
