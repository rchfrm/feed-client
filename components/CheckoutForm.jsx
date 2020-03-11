// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'

import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements'

// IMPORT ASSETS
import StripeLogo from './icons/StripeLogo'
// IMPORT COMPONENTS
// IMPORT CONSTANTS
import brandColours from '../constants/brandColours'
import countries from '../constants/countries'
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { AuthContext } from './contexts/Auth'
import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import Feed from './elements/Feed'
import Error from './elements/Error'
import SelectNew from './elements/SelectNew'
import Button from './elements/Button'
// IMPORT HELPERS
import InputNew from './elements/InputNew'
// IMPORT PAGES
// IMPORT STYLES
import styles from './PaymentPage.module.css'
import paymentHelpers from './helpers/paymentHelpers'


const getButton = (submit) => {
  return (
    <Button version="green" onClick={submit}>
      Submit
    </Button>
  )
}

// CARD INPUTS
const CardInput = () => {
  // Card element styles
  const cardElementStyles = {
    base: {
      color: brandColours.black.hex,
      fontFamily: 'monospace',
      fontSize: '14px',
      fontWeight: '100',
      '::placeholder': {
        color: brandColours.darkGrey.hex,
      },
    },
    invalid: {
      color: brandColours.red.hex,
      iconColor: brandColours.red.hex,
    },
  }

  return (
    <div className="input_container">
      <label className="inputLabel">
        <span className="inputLabel__text">
          Card details
          <span className="asterix">*</span>
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

// INTRO
const PaymentPageIntro = () => {
  return (
    <>
      <h4 className={styles.h4}>Once a month, you'll be charged a small % of what you spend on promotion - a 'service fee' of sorts.</h4>
      <h4 className={styles.h4}>
        More details on
        {' '}
        <Feed />
        's pricing is
        {' '}
        <Link href={ROUTES.PRICES}><a>here</a></Link>
        .
      </h4>
    </>
  )
}

function CheckoutForm({ setSuccess, setCardDetails, elements, stripe }) {
  // Contexts
  const { getToken } = React.useContext(AuthContext)
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
  // END Transform countries array to have name and value keys

  // Functions
  // Handle input changes
  const handleChange = e => {
    switch (e.target.name) {
      case 'address-line-1':
        setAddressLine1(e.target.value)
        break
      case 'address-line-2':
        setAddressLine2(e.target.value)
        break
      case 'city':
        setCity(e.target.value)
        break
      case 'country':
        setCountry(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'name':
        setName(e.target.value)
        break
      case 'state':
        setState(e.target.value)
        break
      default:
        break
    }
    setErrors([])
    setSuccess(false)
  }

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

      console.log('billingDetailsStripe', billingDetailsStripe)
      console.log('paymentMethod', paymentMethod)

      // Stop here if error and show message
      if (error) {
        setErrors([{ message: 'Error adding card' }])
        setSidePanelLoading(false)
        return
      }

      // Send the payment method id to the server
      const verifyToken = await getToken()
      await paymentHelpers.submitPaymentMethod(organisationId, paymentMethod.id, verifyToken)
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
    const button = getButton(buttonSubmit)
    setSidePanelButton(button)
    return () => {
      setSidePanelButton(null)
    }
  }, [])

  return (
    <>
      <PaymentPageIntro />

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

          <InputNew
            handleChange={handleChange}
            name="name"
            label="Name on card"
            placeholder=""
            value={name}
            version="box"
            required
          />

          <InputNew
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

        <InputNew
          handleChange={handleChange}
          name="address-line-1"
          label="Address Line 1"
          placeholder="Street and number, P.O. box, c/o."
          value={addressLine1}
          version="box"
          required
        />

        <InputNew
          handleChange={handleChange}
          name="address-line-2"
          label="Address Line 2"
          placeholder="Flat, suite, unit, building, floor, etc."
          value={addressLine2}
          version="box"
        />

        <InputNew
          handleChange={handleChange}
          name="city"
          label="City"
          placeholder="City"
          value={city}
          version="box"
          required
        />

        <InputNew
          handleChange={handleChange}
          name="state"
          label="State, region, etc."
          placeholder="State, region, etc."
          value={state}
          version="box"
        />

        <SelectNew
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

export default injectStripe(CheckoutForm)
