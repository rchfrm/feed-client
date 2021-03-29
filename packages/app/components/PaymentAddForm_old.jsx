// IMPORT PACKAGES
import React from 'react'

import { CardElement } from '@stripe/react-stripe-js'

// IMPORT ASSETS
import StripeLogo from '@/icons/StripeLogo'
// IMPORT COMPONENTS
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
import countries from '@/constants/countries'
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/UserContext'
import { BillingContext } from '@/app/contexts/BillingContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
import Select from '@/elements/Select'
import Button from '@/elements/Button'
// IMPORT HELPERS
import Input from '@/elements/Input'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/AccountPageCopy'

// IMPORT STYLES
import styles from '@/app/PaymentPage.module.css'
import paymentHelpers from '@/app/helpers/paymentHelpers'


const getButton = (buttonEnabled, submit) => {
  return (
    <Button version="green" onClick={submit} disabled={!buttonEnabled}>
      Submit
    </Button>
  )
}

// CARD INPUTS
const CardInput = () => {
  // Card element styles
  const cardElementStyles = {
    base: {
      color: brandColors.black,
      fontFamily: 'monospace',
      fontSize: '16px',
      '::placeholder': {
        color: brandColors.greyDark,
      },
    },
    invalid: {
      color: brandColors.red,
      iconColor: brandColors.red,
    },
  }

  return (
    <div className="input--container">
      <label className="inputLabel">
        <span className="inputLabel__text">
          Card details
          <span className="asterisk">*</span>
        </span>
      </label>
      {/* Stripe Card element */}
      <CardElement
        className={styles['card-input']}
        style={cardElementStyles}
      />
    </div>
  )
}


function PaymentAddForm({ setSuccess, setCardDetails, elements, stripe }) {
  // Get Side panel context
  const {
    setSidePanelLoading,
    setSidePanelButton,
  } = React.useContext(SidePanelContext)
  // END Contexts

  // States
  const [errors, setErrors] = React.useState([])
  const [addressLine1, setAddressLine1] = React.useState('')
  const [addressLine2, setAddressLine2] = React.useState('')
  const [city, setCity] = React.useState('')
  const [country, setCountry] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [state, setState] = React.useState('')
  const [buttonEnabled, setButtonEnabled] = React.useState(false)
  // END States

  // Set email if user already has email
  const { user } = React.useContext(UserContext)
  React.useEffect(() => {
    if (user.email) {
      setEmail(user.email)
    }
  }, [user.email])


  // Get Org ID from context
  // & get function to set billing details
  const {
    organisation: { id: organisationId },
    fetchBillingDetails,
  } = React.useContext(BillingContext)

  // Transform countries array to have name and value keys
  const countryOptions = countries.map(country => {
    return {
      value: country.id,
      name: country.name,
    }
  })

  // Handle input changes
  const handleChange = (e) => {
    const { target } = e
    const { name, value } = target
    if (name === 'address-line-1') setAddressLine1(value)
    else if (name === 'address-line-2') setAddressLine2(value)
    else if (name === 'city') setCity(value)
    else if (name === 'country') setCountry(value)
    else if (name === 'email') setEmail(value)
    else if (name === 'name') setName(value)
    else if (name === 'state') setState(value)
    setErrors([])
    setSuccess(false)
  }

  // TOGGLE BUTTON ON and OFF
  React.useEffect(() => {
    const enableButton = name && email && addressLine1 && city && country
    setButtonEnabled(enableButton)
  }, [email, name, addressLine1, city, country])


  const handleErrors = () => {
    const errorList = []
    // Check name
    if (!name) {
      errorList.push({ message: 'Please fill in your name' })
    }
    // Check email
    if (!email) {
      errorList.push({ message: 'Please add your billing email' })
    }
    // Check address line 1
    if (!addressLine1) {
      errorList.push({ message: 'Please fill in the first line of your address' })
    }
    // Check city
    if (!city) {
      errorList.push({ message: 'Please fill in your city' })
    }
    // Check country
    if (!country) {
      errorList.push({ message: 'Please select a country' })
    }
    // Set any erros
    setErrors(errorList)
    return errorList.length
  }

  const clearForm = () => {
    setAddressLine1('')
    setAddressLine2('')
    setCity('')
    setCountry('')
    setName('')
    setState('')
  }

  // Create Stripe payment method and submit to server
  const submitPaymentMethod = React.useRef(() => {})
  submitPaymentMethod.current = async (e) => {
    if (e) e.preventDefault()
    // Clear errors
    setErrors([])
    // Check for errors and print any
    const hasErrors = handleErrors()
    // If errors, stop here and scroll to top
    if (hasErrors) {
      document.documentElement.scrollTop = 0
      return
    }

    setSidePanelLoading(true)

    // Create billing details object for Stripe
    const billingDetailsStripe = {
      address: {
        city,
        country,
        line1: addressLine1,
        line2: addressLine2,
        state,
      },
      email,
      name,
    }

    try {
      const cardElement = elements.getElement('card')
      // Send the card element to Stripe to receive a payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetailsStripe,
      })

      // Stop here if error and show message
      if (error) {
        setErrors([{ message: 'Error adding card' }])
        setSidePanelLoading(false)
        return
      }

      // Send the payment method id to the server
      await paymentHelpers.submitPaymentMethod(organisationId, paymentMethod.id)
      // Store key details of the card that was saved in state,
      // and set success to true
      setCardDetails({
        brand: paymentMethod.card.brand,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
        last4: paymentMethod.card.last4,
      })
      // Update billing details context
      await fetchBillingDetails()
      // Then finish
      setSuccess(true)
      setSidePanelLoading(false)
      // Clear form
      clearForm()
    } catch (err) {
      setErrors([err])
      setSidePanelLoading(false)
    }
  }

  // CREATE SIDE PANEL BUTTON
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  React.useEffect(() => {
    const buttonSubmit = () => {
      forceUpdate()
      submitPaymentMethod.current()
    }
    const button = getButton(buttonEnabled, buttonSubmit)
    setSidePanelButton(button)
    return () => {
      setSidePanelButton(null)
    }
  }, [buttonEnabled])

  return (
    <>
      <MarkdownText className="h4--text" markdown={copy.addPaymentIntro} />

      <form
        className={styles['checkout-inputs']}
        onSubmit={submitPaymentMethod.current}
      >

        {/* Show any errors */}
        {errors.map((error, index) => {
          return <Error key={`checkout-errors-${index}`} error={error} />
        })}

        <h2>Card details:</h2>

        <div className={styles['checkout-inputs-section']}>

          <CardInput />

          <Input
            handleChange={handleChange}
            name="name"
            label="Name on card"
            placeholder=""
            value={name}
            version="box"
            required
          />

          <Input
            handleChange={handleChange}
            name="email"
            label="Billing email"
            placeholder=""
            value={email}
            version="box"
            required
          />

        </div>

        <h2>Billing address:</h2>

        <Input
          handleChange={handleChange}
          name="address-line-1"
          label="Address Line 1"
          placeholder="Street and number, P.O. box, c/o."
          value={addressLine1}
          version="box"
          required
        />

        <Input
          handleChange={handleChange}
          name="address-line-2"
          label="Address Line 2"
          placeholder="Flat, suite, unit, building, floor, etc."
          value={addressLine2}
          version="box"
        />

        <Input
          handleChange={handleChange}
          name="city"
          label="City"
          placeholder=""
          value={city}
          version="box"
          required
        />

        <Input
          handleChange={handleChange}
          name="state"
          label="State, region, etc."
          placeholder=""
          value={state}
          version="box"
        />

        <Select
          handleChange={handleChange}
          name="country"
          options={countryOptions}
          label="Country"
          placeholder="Select your country"
          selectedValue={country}
          version="box"
          style={{ fontFamily: 'monospace' }}
          required
        />

        <div className={styles.checkoutStripeLogo}>
          <a href="https://stripe.com/gb" target="_blank" rel="noopener noreferrer">
            <StripeLogo />
          </a>
        </div>

      </form>
    </>
  )
}

export default PaymentAddForm
