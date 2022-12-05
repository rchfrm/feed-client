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
  const [error, setError] = React.useState(null)

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
    if (!isFormValid || isLoading || !setupIntentSecret) return

    setIsLoading(true)

    // Create payment method with Stripe
    const cardElement = elements.getElement(CardElement)
    const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(setupIntentSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
        },
      },
    })

    // Handle error creating payment method
    if (stripeError) {
      setError(error)
      setIsLoading(false)
      elements.getElement('card').focus()
      return
    }

    const stripePaymentMethodId = setupIntent.payment_method

    // Store payment method in DB
    const { res: paymentMethodDb, error: serverError } = await billingHelpers.submitPaymentMethod({
      organizationId,
      paymentMethodId: stripePaymentMethodId,
      shouldBeDefault,
      promoCode,
    })

    // Handle error storing payment method in DB
    if (serverError) {
      setError(serverError)
      setIsLoading(false)
      return
    }

    // TODO Get payment intent if something to pay now, otherwise nothing more needs to be done
    // If payment intent is required
    if (isPaymentIntentRequired) {
      // Get stripe client secret
      const { res, error: getStripeClientSecretError } = await billingHelpers.getStripeClientSecret(organizationId)

      if (getStripeClientSecretError) {
        setError(getStripeClientSecretError)
        setIsLoading(false)
        return
      }

      const { error: confirmCardPaymentError } = await stripe.confirmCardPayment(res.clientSecret, { payment_method: stripePaymentMethodId })

      if (confirmCardPaymentError) {
        setError(confirmCardPaymentError)
        setIsLoading(false)
        elements.getElement('card').focus()

        return
      }
    }

    // Fix setup intent if not success
    // const { setup_intent: setupIntent } = paymentMethodDb
    // if (setupIntent.status !== 'succeeded') {
    //   const res = await stripe.confirmCardSetup(setupIntent.client_secret, {
    //     payment_method: stripePaymentMethodId,
    //   }).catch((error) => {
    //     setError(error)
    //   })
    //   // Handle failure
    //   if (res?.setupIntent?.status !== 'succeeded') {
    //     // Delete payment method
    //     await billingHelpers.deletePaymentMethod(organizationId, stripePaymentMethodId)
    //     setIsLoading(false)
    //     return
    //   }
    // }

    // Set card as default (if necessary)
    if (shouldBeDefault) {
      const { error } = await billingHelpers.setPaymentAsDefault(organizationId, stripePaymentMethodId)
      if (error) {
        await billingHelpers.deletePaymentMethod(organizationId, stripePaymentMethodId)
        setError(error)
        setIsLoading(false)
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
  }, [isFormValid, isLoading, setupIntentSecret, setIsLoading, elements, stripe, name, organizationId, shouldBeDefault, promoCode, isPaymentIntentRequired, addMethodToState, setPaymentMethod, setSuccess, error])

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
  const [setupIntentSecret, setSetupIntentSecret] = React.useState('')

  useAsyncEffect(async () => {
    if (!organizationId) return
    const { res } = await getStripeClientSecret(organizationId, 'setup')
    setSetupIntentSecret(res.clientSecret)
  }, () => {
    setSetupIntentSecret('')
  }, [])

  return (
    <Elements stripe={stripePromise}>
      {/* Defined above... */}
      <FORM
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
  shouldBeDefault: false,
  shouldShowLabels: true,
  setPaymentMethod: () => {},
  setSuccess: () => {},
  isPaymentIntentRequired: false,
  promoCode: '',
}

export default AddPaymentForm
