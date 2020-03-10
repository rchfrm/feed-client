// IMPORT PACKAGES
import { useEffect, useRef, useState } from 'react'
import { Elements } from 'react-stripe-elements'

// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Overlay from './elements/Overlay'
import Spinner from './elements/Spinner'
// IMPORT PAGES
import CheckoutForm from './CheckoutForm'
import PaymentPageSuccess from './PaymentPageSuccess'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES
import styles from './PaymentPage.module.css'
import sidePanelStyles from './SidePanel.module.css'

const PaymentAdd = ({ closePanel }) => {
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

    <section className={styles.PaymentAdd}>

      <h2 className={sidePanelStyles.SidePanel__Header}>Enter your card details</h2>

      <div ref={page}>

        {/* Show loading spinner */}
        {
          loading
            ? (
              <Overlay height={overlayHeight}>
                <Spinner colour={brandColours.green.hex} width={50} />
              </Overlay>
            ) : ''
        }

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
            : <PaymentPageSuccess cardDetails={cardDetails} closePanel={closePanel} />
        }
      </div>

    </section>
  )
}

export default PaymentAdd
