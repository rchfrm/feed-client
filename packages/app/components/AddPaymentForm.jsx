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
  isPaymentRequired,
  profilePlans,
  promoCode,
}) => {
  const elements = useElements()
  const stripe = useStripe()
  const [name, setName] = React.useState('')

  // WAIT FOR STRIPE TO LOAD
  React.useEffect(() => {
    if (! stripe || ! elements) {
      setIsLoading(true)
      return
    }
    setIsLoading(false)
  }, [elements, stripe, setIsLoading])

  // TEST FORM IS VALID
  const [cardComplete, setCardComplete] = React.useState(false)
  React.useEffect(() => {
    const formValid = !! (name && elements && stripe && cardComplete)
    setIsFormValid(formValid)
  }, [name, cardComplete, elements, stripe, setIsFormValid])

  const handleError = React.useCallback((error) => {
    setError(error)
    setIsLoading(false)
    elements.getElement('card').focus()
  }, [elements, setError, setIsLoading])

  const confirmSetup = React.useCallback(async (cardEl) => {
    const { res, error: setupIntentSecretError } = await billingHelpers.getStripeClientSecret(organizationId, 'setup')
    if (setupIntentSecretError) {
      return { error: setupIntentSecretError }
    }

    const { setupIntent, error: setupIntentError } = await stripe.confirmCardSetup(res.clientSecret, {
      payment_method: {
        card: cardEl,
        billing_details: {
          name,
        },
      },
    })
    if (setupIntentError) {
      return { error: setupIntentError }
    }

    return { paymentMethodId: setupIntent.payment_method }
  }, [name, organizationId, stripe])

  const confirmPayment = React.useCallback(async (cardEl) => {
    if (!profilePlans) {
      const error = { message: 'If payment is required, then profile plans also need to be supplied' }
      return { error }
    }

    const { res, error: upgradeProfileError } = await billingHelpers.upgradeProfiles(organizationId, profilePlans, promoCode)
    if (upgradeProfileError) {
      return { error: upgradeProfileError }
    }

    const { paymentIntent, error: confirmCardPaymentError } = await stripe.confirmCardPayment(res.clientSecret, {
      payment_method: {
        card: cardEl,
        billing_details: {
          name,
        },
      },
    })
    if (confirmCardPaymentError) {
      return { error: confirmCardPaymentError }
    }

    return { paymentMethodId: paymentIntent.payment_method }
  }, [name, organizationId, profilePlans, promoCode, stripe])

  // HANDLE FORM
  const onSubmit = React.useCallback(async () => {
    if (! isFormValid || isLoading) return

    setIsLoading(true)

    const cardElement = elements.getElement(CardElement)

    const { paymentMethodId, error } = isPaymentRequired
      ? await confirmPayment(cardElement)
      : await confirmSetup(cardElement)

    if (error) {
      return handleError(error)
    }

    // Store payment method in db
    const { res: paymentMethodDb, error: serverError } = await billingHelpers.submitPaymentMethod({
      organizationId,
      paymentMethodId,
      shouldBeDefault,
      promoCode,
    })
    if (serverError) {
      return handleError(serverError)
    }

    // Handle success
    setIsLoading(false)
    setError(null)
    addMethodToState(paymentMethodDb)
    setPaymentMethod(paymentMethodDb)
    setSuccess(true)
    // Track
    track('billing_finish_add_payment', { organizationId, shouldBeDefault })
  }, [isFormValid, isLoading, setIsLoading, elements, isPaymentRequired, confirmPayment, confirmSetup, organizationId, shouldBeDefault, promoCode, setError, addMethodToState, setPaymentMethod, setSuccess, handleError])

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
  isPaymentRequired,
  profilePlans,
  promoCode,
}) => {
  const [stripePromise] = React.useState(() => loadStripe(process.env.stripe_provider))
  const [error, setError] = React.useState(null)

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
        isPaymentRequired={isPaymentRequired}
        profilePlans={profilePlans}
        promoCode={promoCode}
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
  isPaymentRequired: PropTypes.bool,
  profilePlans: PropTypes.objectOf(PropTypes.string),
  promoCode: PropTypes.string,
}

AddPaymentForm.defaultProps = {
  organizationId: '',
  setPaymentMethod: () => {},
  setSuccess: () => {},
  shouldBeDefault: false,
  shouldShowLabels: true,
  isPaymentRequired: false,
  profilePlans: undefined,
  promoCode: '',
}

export default AddPaymentForm
