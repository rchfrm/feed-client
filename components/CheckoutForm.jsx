// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import { CardElement, injectStripe } from 'react-stripe-elements'
import Link from 'next/link'

// IMPORT ASSETS
import moment from 'moment'
import Stripe from './icons/Stripe'
// IMPORT COMPONENTS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
import brandColours from '../constants/brandColours'
import countries from '../constants/countries'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Error from './elements/Error'
import Feed from './elements/Feed'
import SelectNew from './elements/SelectNew'
// IMPORT HELPERS
import server from './helpers/server'
import InputNew from './elements/InputNew'
import Spinner from './elements/Spinner'
import Overlay from './elements/Overlay'
// IMPORT PAGES
// IMPORT STYLES
import styles from './PaymentPage.module.css'

function CheckOutForm(props) {
// Contexts
  const { getToken } = React.useContext(AuthContext)
  // END Contexts

  // States
  const [error, setError] = React.useState(null)
  const [addressLine1, setAddressLine1] = React.useState('')
  const [addressLine2, setAddressLine2] = React.useState('')
  const [cardDetails, setCardDetails] = React.useState({})
  const [city, setCity] = React.useState('')
  const [country, setCountry] = React.useState('placeholder')
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState('')
  const [overlayHeight, setOverlayHeight] = React.useState(0)
  const [state, setState] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  // END States

  // Set email if user already has email
  const { user } = React.useContext(UserContext)
  React.useEffect(() => {
    if (user.email) {
      setEmail(user.email)
    }
  }, [user.email])

  // Card element styles
  const cardElementStyles = {
    base: {
      color: brandColours.black.hex,
      fontFamily: 'monospace',
      fontSize: '1em',
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
  // END Card element styles

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
    setError(null)
    setSuccess(false)
  }

  // Create Stripe payment method and submit to server
  const submitPaymentMethod = async (e) => {
    if (e) {
      console.log(e)
    }
    // If there is no name filled in, return and create an error
    if (name === '') {
      setError({ message: 'Please fill in your name' })
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
      const cardElement = props.elements.getElement('card')
      // Send the card element to Stripe to receive a payment method
      const paymentMethod = await props.stripe.createPaymentMethod({
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
      setError(err)
      setLoading(false)
    }
  }
  // END Functions

  // Calculate the height of the page for use in the loading state
  const page = React.useRef(null)
  React.useEffect(() => {
    if (page.current) {
      setOverlayHeight(page.current.offsetHeight)
    }
  }, [])
  // END Calculate the height of the page for use in the loading state

  if (success) {
    return <PaymentSuccess cardDetails={cardDetails} />
  }

  return (
    <div className={styles['checkout-page']} ref={page}>

      {
        loading
          ? <Overlay height={overlayHeight}><Spinner colour={brandColours.green.hex} width={50} /></Overlay>
          : ''
      }

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

      <div className={styles['checkout-inputs']}>

        <Error error={error} />

        <h2>Card details:</h2>

        <div className={styles['checkout-inputs-section']}>

          <CardElement className={styles['card-input']} style={cardElementStyles} />

          <InputNew handleChange={handleChange} name="name" placeholder="Name on card" value={name} version="box" />

          <InputNew handleChange={handleChange} name="email" placeholder="Billing email" value={email} version="box" />

        </div>

        <h2>Billing address:</h2>

        <InputNew
          handleChange={handleChange}
          name="address-line-1"
          placeholder="Address Line 1"
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

          <InputNew handleChange={handleChange} name="city" placeholder="City" value={city} version="box" width={48.611} />

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
          placeholder="Country"
          selectedValue={country}
          style={{ fontFamily: 'monospace' }}
        />

        <a href="https://stripe.com/gb" target="_blank" rel="noopener noreferrer">
          <Stripe />
        </a>

      </div>

      <Button
        version="black progress"
        onClick={submitPaymentMethod}
      >
        Submit
      </Button>

    </div>
  )
}

export default injectStripe(CheckOutForm)

function PaymentSuccess(props) {
// Redefine props as variables
  const { cardDetails } = props
  // END Redefine props as variables

  const handleClick = e => {
    e.preventDefault()
    Router.push(ROUTES.ACCOUNT)
  }

  return (
    <div className={`ninety-wide ${styles['payment-success']}`}>

      <div className={styles['payment-success-headers']}>

        <h4 className={styles.h4}>
          Thanks! You successfully saved your
          {cardDetails.brand.toUpperCase()}
          {' '}
          card ending&nbsp;
          {cardDetails.last4}
          , that expires in
          {moment(cardDetails.exp_month, 'M').format('MMMM')}
          {' '}
          {moment(cardDetails.exp_year, 'YY').format('YYYY')}
          , to your&nbsp;
          <Feed />
          &nbsp;account.
        </h4>
        <h4 className={styles.h4}>
          You can view, and update your payment details at any time from the&nbsp;
          <Link href={ROUTES.ACCOUNT}><a>account</a></Link>
          {' '}
          page.
        </h4>

      </div>

      <Button
        version="black progress"
        onClick={handleClick}
      >
        Ok.
      </Button>
    </div>
  )
}
