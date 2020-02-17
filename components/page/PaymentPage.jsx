// IMPORT PACKAGES
import React from 'react'
import { Elements } from 'react-stripe-elements'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../elements/PageHeader'
// IMPORT PAGES
import CheckoutForm from '../CheckoutForm'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function PaymentPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page-container ${className}`}>

      <PageHeader heading="Enter your card details" />

      <Elements>

        <CheckoutForm />

      </Elements>

    </div>
  )
}

export default PaymentPage
