import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import Error from '@/elements/Error'
import Input from '@/elements/Input'

import InputBase from '@/elements/InputBase'

import useBillingStore from '@/app/stores/billingStore'

import * as billingHelpers from '@/app/helpers/billingHelpers'
import { track } from '@/helpers/trackingHelpers'

import brandColors from '@/constants/brandColors'

const STRIPE_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: brandColors.black,
      letterSpacing: '0.025em',
      '::placeholder': {
        color: brandColors.greyDark,
      },
    },
    invalid: {
      color: brandColors.red,
    },
  },
}

// READING FROM STORE
const getBillingStoreState = (state) => ({
  addPaymentMethod: state.addPaymentMethod,
})

// THE FORM
const FORM = ({
  organisationId,
  setPaymentMethod,
  setSuccess,
  shouldBeDefault,
  shouldShowLabels,
  setAddPaymentMethod,
  isFormValid,
  setIsFormValid,
  isLoading,
  setIsLoading,
  isPaymentRequired,
}) => {
  const elements = useElements()
  const stripe = useStripe()
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState(null)

  // READ from BILLING STORE
  const { addPaymentMethod } = useBillingStore(getBillingStoreState, shallow)

  // WAIT FOR STRIPE TO LOAD
  React.useEffect(() => {
    if (!stripe || !elements) {
      setIsLoading(true)
      return
    }
    setIsLoading(false)
  }, [elements, stripe, setIsLoading])

  // TEST FORM IS VALID
  const [cardComplete, setCardComplete] = React.useState(false)
  React.useEffect(() => {
    const formValid = !!(name && elements && stripe && cardComplete)
    setIsFormValid(formValid)
  }, [name, cardComplete, elements, stripe, setIsFormValid])


  // * HANDLE FORM
  // --------------
  const onSubmit = React.useCallback(async () => {
    if (!isFormValid || isLoading) return

    setIsLoading(true)

    let stripeError = null
    let stripePaymentMethod = null

    // If payment is required...
    if (isPaymentRequired) {
      // Get stripe client secret
      const { res, error: getStripeClientSecretError } = await billingHelpers.getStripeClientSecret(organisationId)

      if (getStripeClientSecretError) {
        stripeError = getStripeClientSecretError
        setIsLoading(false)
        return
      }

      console.log(res)

      // Confirm and handle payment
      // const cardElement = elements.getElement(CardElement)

      // const { error: confirmCardPaymentError } = await stripe.confirmCardPayment('abcd_secret_1234', {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: {
      //       name,
      //     },
      //   },
      // })

      // stripeError = confirmCardPaymentError
    } else {
      // Create payment method with Stripe
      const cardElement = elements.getElement(CardElement)
      const { paymentMethod, error: createPaymentError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
        },
      })

      stripeError = createPaymentError
      stripePaymentMethod = paymentMethod
    }

    // Handle Stripe error
    if (stripeError) {
      setError(stripeError)
      setIsLoading(false)
      elements.getElement('card').focus()

      return
    }

    // Add payment method to DB
    const { res: paymentMethodDb, error: serverError } = await billingHelpers.submitPaymentMethod({
      organisationId,
      paymentMethodId: stripePaymentMethod.id,
      shouldBeDefault,
    })

    // Handle error adding payment to DB
    if (serverError) {
      setError(serverError)
      setIsLoading(false)
      return
    }

    // Fix setup intent if not success
    const { setup_intent: setupIntent } = paymentMethodDb
    if (setupIntent.status !== 'succeeded') {
      const res = await stripe.confirmCardSetup(setupIntent.client_secret, {
        payment_method: stripePaymentMethod.id,
      }).catch((error) => {
        setError(error)
      })
      // Handle failure
      if (res?.setupIntent?.status !== 'succeeded') {
        // Delete payment method
        await billingHelpers.deletePaymentMethod(organisationId, stripePaymentMethod.id)
        setIsLoading(false)
        return
      }
    }

    // Set card as default (if necessary)
    if (shouldBeDefault) {
      const { error } = await billingHelpers.setPaymentAsDefault({
        organisationId,
        paymentMethodId: stripePaymentMethod.id,
      })
      if (error) {
        await billingHelpers.deletePaymentMethod(organisationId, stripePaymentMethod.id)
        setError(error)
        setIsLoading(false)
        return
      }
    }

    // Handle success
    setIsLoading(false)
    setError(null)
    // Update store
    addPaymentMethod(paymentMethodDb)
    // Update local state
    setPaymentMethod(paymentMethodDb)
    setSuccess(true)
    // Track
    track('billing_finish_add_payment', { organisationId, shouldBeDefault })
  }, [isFormValid, isLoading, setIsLoading, name, organisationId, shouldBeDefault, setSuccess, setPaymentMethod, addPaymentMethod, stripe, elements, isPaymentRequired])

  React.useEffect(() => {
    setAddPaymentMethod(() => onSubmit)
  }, [setAddPaymentMethod, onSubmit])

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
        label={shouldShowLabels ? 'Full name' : ''}
        placeholder="Name on card"
        name="name"
        value={name}
        updateValue={setName}
        required
      />

      {/* CARD ELEMENT
          Includes: Card number, expiry date, CVC, postal/zip
      */}
      <InputBase label={shouldShowLabels ? 'Card details' : ''} name="card-details" required>
        <div className="border-2 border-solid border-black rounded-button px-4 py-5">
          <CardElement
            options={STRIPE_ELEMENT_OPTIONS}
            onChange={(e) => {
              const { complete } = e
              setCardComplete(complete)
            }}
          />
        </div>
      </InputBase>
    </form>
  )
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.stripe_provider)

const AddPaymentForm = ({
  organisationId,
  setPaymentMethod,
  setSuccess,
  shouldBeDefault,
  shouldShowLabels,
  setAddPaymentMethod,
  isFormValid,
  setIsFormValid,
  isLoading,
  setIsLoading,
  isPaymentRequired,
}) => {
  return (
    <Elements stripe={stripePromise}>
      {/* Defined above... */}
      <FORM
        organisationId={organisationId}
        setAddPaymentMethod={setAddPaymentMethod}
        setPaymentMethod={setPaymentMethod}
        setSuccess={setSuccess}
        shouldBeDefault={shouldBeDefault}
        shouldShowLabels={shouldShowLabels}
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isPaymentRequired={isPaymentRequired}
      />
    </Elements>
  )
}

AddPaymentForm.propTypes = {
  setPaymentMethod: PropTypes.func,
  setSuccess: PropTypes.func,
  shouldBeDefault: PropTypes.bool,
  shouldShowLabels: PropTypes.bool,
  setAddPaymentMethod: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isPaymentRequired: PropTypes.bool,
}

AddPaymentForm.defaultProps = {
  shouldBeDefault: false,
  shouldShowLabels: true,
  setPaymentMethod: () => {},
  setSuccess: () => {},
  isPaymentRequired: false,
}

export default AddPaymentForm
