import React from 'react'
import PropTypes from 'prop-types'
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
import * as billingHelpers from '@/app/helpers/billingHelpers'
import { track } from '@/helpers/trackingHelpers'
import brandColors from '@/constants/brandColors'
import useAsyncEffect from 'use-async-effect'
import { getStripeClientSecret } from '@/app/helpers/billingHelpers'

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

// THE FORM
const FORM = ({
  organizationId,
  setError,
  setPaymentMethod,
  setSuccess,
  shouldBeDefault,
  shouldShowLabels,
  addMethodToState,
  setAddPaymentMethod,
  isFormValid,
  setIsFormValid,
  isLoading,
  setIsLoading,
  isPaymentIntentRequired,
  promoCode,
  setupIntentSecret,
}) => {
  const elements = useElements()
  const stripe = useStripe()
  const [name, setName] = React.useState('')

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

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (!isFormValid || isLoading || !setupIntentSecret) return

    setIsLoading(true)

    // Create payment method with Stripe
    const cardElement = elements.getElement(CardElement)
    const { setupIntent, error: setupIntentError } = await stripe.confirmCardSetup(setupIntentSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
        },
      },
    })

    // Handle error creating setup intent
    if (setupIntentError) {
      setError(setupIntentError)
      setIsLoading(false)
      elements.getElement('card').focus()
      return
    }

    const stripePaymentMethodId = setupIntent.payment_method

    // Store payment method in db
    const { res: paymentMethodDb, error: serverError } = await billingHelpers.submitPaymentMethod({
      organizationId,
      paymentMethodId: stripePaymentMethodId,
      shouldBeDefault,
      promoCode,
    })

    // Handle error storing payment method in db
    if (serverError) {
      setError(serverError)
      setIsLoading(false)
      return
    }

    // If payment intent is required
    if (isPaymentIntentRequired) {
      // Get stripe client secret
      const { res, error: paymentIntentSecretError } = await billingHelpers.getStripeClientSecret(organizationId, 'payment')

      if (paymentIntentSecretError) {
        setError(paymentIntentSecretError)
        setIsLoading(false)
        return
      }

      const { error: confirmCardPaymentError } = await stripe.confirmCardPayment(res.clientSecret, {
        payment_method: stripePaymentMethodId,
      })

      if (confirmCardPaymentError) {
        setError(confirmCardPaymentError)
        setIsLoading(false)
        elements.getElement('card').focus()

        return
      }
    }

    // Handle success
    setIsLoading(false)
    setError(null)
    addMethodToState(paymentMethodDb)
    setPaymentMethod(paymentMethodDb)
    setSuccess(true)
    // Track
    track('billing_finish_add_payment', { organizationId, shouldBeDefault })
  }, [isFormValid, isLoading, setupIntentSecret, setIsLoading, elements, stripe, name, organizationId, shouldBeDefault, promoCode, isPaymentIntentRequired, setError, addMethodToState, setPaymentMethod, setSuccess])

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

const AddPaymentForm = ({
  organizationId,
  setPaymentMethod,
  setSuccess,
  shouldBeDefault,
  addMethodToState,
  shouldShowLabels,
  setAddPaymentMethod,
  isFormValid,
  setIsFormValid,
  isLoading,
  setIsLoading,
  isPaymentIntentRequired,
  promoCode,
}) => {
  const [stripePromise] = React.useState(() => loadStripe(process.env.stripe_provider))
  const [error, setError] = React.useState(null)
  const [setupIntentSecret, setSetupIntentSecret] = React.useState('')

  useAsyncEffect(async () => {
    if (!organizationId) return
    const { res, error } = await getStripeClientSecret(organizationId, 'setup')
    if (error) {
      setError(error)
      setSetupIntentSecret('')
      return
    }
    setSetupIntentSecret(res.clientSecret)
  }, () => {
    setSetupIntentSecret('')
  }, [])

  return (
    <Elements stripe={stripePromise}>
      <Error error={error} />
      {/* Defined above... */}
      <FORM
        setError={setError}
        organizationId={organizationId}
        setPaymentMethod={setPaymentMethod}
        setSuccess={setSuccess}
        shouldBeDefault={shouldBeDefault}
        addMethodToState={addMethodToState}
        setAddPaymentMethod={setAddPaymentMethod}
        shouldShowLabels={shouldShowLabels}
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isPaymentIntentRequired={isPaymentIntentRequired}
        promoCode={promoCode}
        setupIntentSecret={setupIntentSecret}
      />
    </Elements>
  )
}

AddPaymentForm.propTypes = {
  organizationId: PropTypes.string,
  setPaymentMethod: PropTypes.func,
  setSuccess: PropTypes.func,
  shouldBeDefault: PropTypes.bool,
  shouldShowLabels: PropTypes.bool,
  addMethodToState: PropTypes.func.isRequired,
  setAddPaymentMethod: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isPaymentIntentRequired: PropTypes.bool,
  promoCode: PropTypes.string,
}

AddPaymentForm.defaultProps = {
  organizationId: '',
  setPaymentMethod: () => {},
  setSuccess: () => {},
  shouldBeDefault: false,
  shouldShowLabels: true,
  isPaymentIntentRequired: false,
  promoCode: '',
}

export default AddPaymentForm
