import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import BillingAddPaymentForm from '@/app/BillingAddPaymentForm'
// import PaymentAddForm from '@/app/PaymentAddForm_old' // OLD FORM

import PaymentPageSuccess from '@/app/PaymentPageSuccess'

import styles from '@/app/PaymentPage.module.css'
import sidePanelStyles from '@/app/SidePanel.module.css'


const BillingPaymentAdd = ({
  setSidePanelButton,
  toggleSidePanel,
}) => {
  // HANDLE SUCCESS
  const [success, setSuccess] = React.useState(false)

  // CHANGE SIDEPANEL BUTTON on SUCCESS
  React.useEffect(() => {
    if (success) {
      const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>
      setSidePanelButton(button)
    }
  }, [success, setSidePanelButton, toggleSidePanel])

  return (

    <section className={styles.PaymentAdd}>

      <h2 className={sidePanelStyles.SidePanel__Header}>Enter your card details</h2>

      <div>
        {success ? <PaymentPageSuccess /> : (
          <BillingAddPaymentForm
            setSidePanelButton={setSidePanelButton}
            setSuccess={setSuccess}
          />
        )}
      </div>

    </section>
  )
}

BillingPaymentAdd.propTypes = {
  setSidePanelButton: PropTypes.func.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
}

export default BillingPaymentAdd
