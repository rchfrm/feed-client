// IMPORT PACKAGES
import React from 'react'
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe,
} from 'react-stripe-elements'

// IMPORT ASSETS
import Stripe from './icons/Stripe'
// IMPORT COMPONENTS
// IMPORT CONSTANTS
import brandColours from '../constants/brandColours'
import countries from '../constants/countries'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
import Error from './elements/Error'
import SelectNew from './elements/SelectNew'
import Button from './elements/Button'
// IMPORT HELPERS
import server from './helpers/server'
import InputNew from './elements/InputNew'
// IMPORT PAGES
// IMPORT STYLES
import styles from './PaymentPage.module.css'


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
    <CardElement
      className={styles['card-input']}
      style={cardElementStyles}
    />
  )
}

function CheckoutForm({ setLoading, setSuccess, setCardDetails, elements, stripe }) {
  console.log('stripe', stripe)
  console.log('elements', elements)
  // Contexts
  const { getToken } = React.useContext(AuthContext)
  // END Contexts

  // States
  const [errors, setErrors] = React.useState([])
  const [addressLine1, setAddressLine1] = React.useState('')
  const [addressLine2, setAddressLine2] = React.useState('')
  const [city, setCity] = React.useState('')
  const [country, setCountry] = React.useState('placeholder')
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

  // Create Stripe payment method and submit to server
  const submitPaymentMethod = async (e) => {
    e.preventDefault()
    // Check for errors and print any
    const hasErrors = handleErrors()
    // If errors, stop here and scroll to top
    if (hasErrors) {
      document.documentElement.scrollTop = 0
      return
    }

    setLoading(true)

    // Create billing details object
    let billingDetails = {}
    const states = [{ addressLine1 }, { addressLine2 }, { city }, { country }, { email }, { name }, { state }]
    // Cycle through each state, and if it has a value,
    // add it to the billing details object
    states.forEach(state => {
      let key = Object.keys(state)[0]
      const value = Object.values(state)[0]

      // Rename the address states to the key required by Stripe
      if (key === 'addressLine1') { key = 'line1' }
      if (key === 'addressLine2') { key = 'line2' }

      if (value && (key === 'email' || key === 'name')) {
        // Add any value for email to the first level of the object
        billingDetails = {
          ...billingDetails,
          [key]: value,
        }
      } else if (value && value !== 'placeholder') {
        // Add any address values to the object within an address key
        billingDetails = {
          ...billingDetails,
          address: {
            ...billingDetails.address,
            [key]: value,
          },
        }
      }
    })
    // If the billing details object has key/value pairs in it,
    // place them within a key called 'billing_details'
    if (Object.keys(billingDetails).length > 0) {
      billingDetails = {
        billing_details: { ...billingDetails },
      }
    }

    try {
      const cardElement = elements.getElement('card')
      // Send the card element to Stripe to receive a payment method
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        ...billingDetails,
      })

      // Send the payment method id to the server
      const verifyToken = await getToken()
      await server.submitPaymentMethod(paymentMethod.paymentMethod.id, verifyToken)
      // Store key details of the card that was saved in state,
      // and set success to true
      setCardDetails({
        brand: paymentMethod.paymentMethod.card.brand,
        exp_month: paymentMethod.paymentMethod.card.exp_month,
        exp_year: paymentMethod.paymentMethod.card.exp_year,
        last4: paymentMethod.paymentMethod.card.last4,
      })
      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setErrors([err])
      setLoading(false)
    }
  }
  // END Functions

  return (
    <form
      className={styles['checkout-inputs']}
      onSubmit={submitPaymentMethod}
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
          placeholder="Name on card*"
          value={name}
          version="box"
        />

        <InputNew
          handleChange={handleChange}
          name="email"
          placeholder="Billing email*"
          value={email}
          version="box"
        />

      </div>

      <h2>Billing address:</h2>

      <InputNew
        handleChange={handleChange}
        name="address-line-1"
        placeholder="Address Line 1*"
        value={addressLine1}
        version="box"
      />

      <InputNew
        handleChange={handleChange}
        name="address-line-2"
        placeholder="Address Line 2"
        value={addressLine2}
        version="box"
      />

      <div className={styles['city-state']}>

        <InputNew
          handleChange={handleChange}
          name="city"
          placeholder="City*"
          value={city}
          version="box"
          width={48.611}
        />

        <InputNew
          handleChange={handleChange}
          name="state"
          placeholder="State, region, etc."
          value={state}
          version="box"
          width={48.611}
        />

      </div>

      <SelectNew
        handleChange={handleChange}
        name="country"
        options={countryOptions}
        placeholder="Country*"
        selectedValue={country}
        style={{ fontFamily: 'monospace' }}
      />

      <a href="https://stripe.com/gb" target="_blank" rel="noopener noreferrer">
        <Stripe />
      </a>

      <div className={styles.checkoutButtonWrapper}>
        <Button
          version="black progress"
          type="submit"
          onClick={submitPaymentMethod}
        >
          Submit
        </Button>
      </div>

    </form>
  )
}

export default injectStripe(CheckoutForm)
