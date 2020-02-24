// IMPORT PACKAGES
import { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Elements } from 'react-stripe-elements'

// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import Feed from '../elements/Feed'
import Overlay from '../elements/Overlay'
import Spinner from '../elements/Spinner'
import PageHeader from '../elements/PageHeader'
// IMPORT PAGES
import CheckoutForm from '../CheckoutForm'
import PaymentPageSuccess from '../PaymentPageSuccess'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES
import styles from '../PaymentPage.module.css'

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

const PaymentPage = () => {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cardDetails, setCardDetails] = useState({})

  // Calculate the height of the page for use in the loading state
  const [overlayHeight, setOverlayHeight] = useState(0)
  const page = useRef(null)
  useEffect(() => {
    if (page.current) {
      setOverlayHeight(page.current.offsetHeight)
    }
  }, [])

  return (

    <div className={`page-container ${className}`}>

      <PageHeader heading="Enter your card details" />

      <div className={styles['checkout-page']} ref={page}>

        {/* Show loading spinner */}
        {
          loading
            ? (
              <Overlay height={overlayHeight}>
                <Spinner colour={brandColours.green.hex} width={50} />
              </Overlay>
            )
            : ''
        }

        <PaymentPageIntro />

        {
          !success
            ? (
              <Elements>
                <CheckoutForm
                  setLoading={setLoading}
                  setSuccess={setSuccess}
                  setCardDetails={setCardDetails}
                />
              </Elements>
            )
            : <PaymentPageSuccess cardDetails={cardDetails} />
        }
      </div>

    </div>
  )
}

export default PaymentPage
