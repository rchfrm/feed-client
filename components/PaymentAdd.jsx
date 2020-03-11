// IMPORT PACKAGES
import React from 'react'
import { Elements } from 'react-stripe-elements'

// IMPORT COMPONENTS
import PaymentAddForm from './PaymentAddForm'
import PaymentPageSuccess from './PaymentPageSuccess'

import styles from './PaymentPage.module.css'
import sidePanelStyles from './SidePanel.module.css'

const PaymentAdd = ({ closePanel }) => {
  const [success, setSuccess] = React.useState(false)
  const [cardDetails, setCardDetails] = React.useState({})

  return (

    <section className={styles.PaymentAdd}>

      <h2 className={sidePanelStyles.SidePanel__Header}>Enter your card details</h2>

      <div>
        {
          !success
            ? (
              <Elements>
                <PaymentAddForm
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
