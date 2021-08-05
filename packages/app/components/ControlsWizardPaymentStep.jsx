import React from 'react'
// import PropTypes from 'prop-types'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Input from '@/elements/Input'
import InputBase from '@/elements/InputBase'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

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

const FORM = () => {
  const elements = useElements()
  const stripe = useStripe()
  const [cardName, setCardName] = React.useState('')
  const [cardNumber, setCardNumber] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const { next } = React.useContext(WizardContext)

  // WAIT FOR STRIPE TO LOAD
  React.useEffect(() => {
    if (!stripe || !elements) {
      setIsLoading(true)
      return
    }
    setIsLoading(false)
  }, [elements, stripe])

  const handleChange = e => {
    switch (e.target.name) {
      case 'card-name':
        setCardName(e.target.value)
        break
      case 'card-number':
        setCardNumber(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPaymentStepIntro} />
      <Input
        placeholder="Full name on card"
        type="text"
        version="box"
        name="card-name"
        value={cardName}
        handleChange={handleChange}
      />
      <InputBase name="card-number">
        <div className="border-2 border-solid border-black rounded-button px-4 py-5">
          <CardElement
            options={STRIPE_ELEMENT_OPTIONS}
            onChange={handleChange}
          />
        </div>
      </InputBase>
      <Button
        version="outline-green icon"
        onClick={next}
        spinnerFill={brandColors.black}
        className="w-full mb-10"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

const stripePromise = loadStripe(process.env.stripe_provider)

const ControlsWizardPaymentStep = () => {
  return (
    <Elements stripe={stripePromise}>
      <FORM />
    </Elements>
  )
}

ControlsWizardPaymentStep.propTypes = {
}

export default ControlsWizardPaymentStep
