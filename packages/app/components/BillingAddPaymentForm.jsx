import React from 'react'
import PropTypes from 'prop-types'

import { loadStripe } from '@stripe/stripe-js'

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import useBillingStore from '@/app/stores/billingStore'

import { submitPaymentMethod } from '@/app/helpers/paymentHelpers'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import InputBase from '@/elements/InputBase'

import brandColors from '@/constants/brandColors'

const STRIPE_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Inter, serif',
      color: brandColors.black,
      letterSpacing: '0.025em',
      '::placeholder': {
        color: brandColors.grey,
      },
    },
    invalid: {
      color: brandColors.red,
    },
  },
}

// READ FROM STORE
const getOrganisation = state => state.organisation

// THE FORM
const FORM = ({
  setSidePanelButton,
  setPaymentMethod,
  setSuccess,
  setAsDefault,
}) => {
  const elements = useElements()
  const stripe = useStripe()
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState(null)

  // GET ORG ID from Billing Store
  const { id: organisationId } = useBillingStore(getOrganisation)

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
  const [cardComplete, setCardComplete] = React.useState(false)
  React.useEffect(() => {
    const formValid = !!(name && elements && stripe && cardComplete)
    setIsFormValid(formValid)
  }, [name, cardComplete, elements, stripe])

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (!isFormValid || isLoading) return
    setIsLoading(true)
    // Create payment method with Stripe
    const cardElement = elements.getElement(CardElement)
    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
      },
    })
    console.log('paymentMethod', paymentMethod)
    // Handle Stripe error
    if (stripeError) {
      setError(stripeError)
      setIsLoading(false)
      elements.getElement('card').focus()
      return
    }
    // Add payment method to DB
    const { res, error: serverError } = await submitPaymentMethod(organisationId, paymentMethod.id)
    console.log('res', res)
    setIsLoading(false)
    // Handle error adding payment to DB
    if (serverError) {
      setError(serverError)
      return
    }
    // Handle success
    setError(null)
    setPaymentMethod({
      ...paymentMethod,
      setAsDefault,
    })
    setSuccess(true)
  }, [isFormValid, isLoading, name, organisationId, setAsDefault, setSuccess, setPaymentMethod, stripe, elements])

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
        name="name"
        value={name}
        updateValue={setName}
        required
      />

      {/* CARD ELEMENT
          Includes: Card number, expiry date, CVC, postal/zip
      */}
      <InputBase label="Card details" name="card-details" required>
        <div className="border-2 border-solid border-black rounded-button px-4 py-5">
          <CardElement
            options={STRIPE_ELEMENT_OPTIONS}
            onChange={(e) => {
              const { complete } = e
              console.log('CardElement [change]', e)
              setCardComplete(complete)
            }}
          />
        </div>
      </InputBase>

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
  setPaymentMethod,
  setSuccess,
  setAsDefault,
}) => {
  return (
    <Elements stripe={stripePromise}>
      {/* Defined above... */}
      <FORM
        setSidePanelButton={setSidePanelButton}
        setPaymentMethod={setPaymentMethod}
        setSuccess={setSuccess}
        setAsDefault={setAsDefault}
      />
    </Elements>
  )
}

BillingAddPaymentForm.propTypes = {
  setSidePanelButton: PropTypes.func.isRequired,
  setPaymentMethod: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setAsDefault: PropTypes.bool,
}

BillingAddPaymentForm.defaultProps = {
  setAsDefault: false,
}

export default BillingAddPaymentForm
