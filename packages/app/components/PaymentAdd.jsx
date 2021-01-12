// IMPORT PACKAGES
import React from 'react'
import { Elements } from 'react-stripe-elements'

// IMPORT COMPONENTS
import PaymentAddForm from '@/app/PaymentAddForm'
import PaymentPageSuccess from '@/app/PaymentPageSuccess'

import styles from '@/app/PaymentPage.module.css'
import sidePanelStyles from '@/app/SidePanel.module.css'

const PaymentAdd = () => {
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
            : <PaymentPageSuccess cardDetails={cardDetails} />
        }
      </div>

    </section>
  )
}

export default PaymentAdd
