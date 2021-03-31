import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import BillingAddPaymentForm from '@/app/BillingAddPaymentForm'
// import PaymentAddForm from '@/app/PaymentAddForm_old' // OLD FORM

import BillingPaymentAddSuccess from '@/app/BillingPaymentAddSuccess'

import copy from '@/app/copy/billingCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'

const BillingPaymentAdd = ({
  shouldBeDefault,
  setSidePanelButton,
  toggleSidePanel,
  setSidePanelLoading,
}) => {
  // HANDLE SUCCESS
  const [paymentMethod, setPaymentMethod] = React.useState(null)
  const [success, setSuccess] = React.useState(false)

  // CHANGE SIDEPANEL BUTTON on SUCCESS
  React.useEffect(() => {
    if (success) {
      const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>
      setSidePanelButton(button)
    }
  }, [success, setSidePanelButton, toggleSidePanel])

  return (

    <section>

      <h2 className={sidePanelStyles.SidePanel__Header}>
        {copy.addPaymentHeader(success)}
      </h2>

      <div>
        {success ? <BillingPaymentAddSuccess paymentMethod={paymentMethod} /> : (
          <BillingAddPaymentForm
            setSidePanelButton={setSidePanelButton}
            setSidePanelLoading={setSidePanelLoading}
            setPaymentMethod={setPaymentMethod}
            setSuccess={setSuccess}
            shouldBeDefault={shouldBeDefault}
          />
        )}
      </div>

    </section>
  )
}

BillingPaymentAdd.propTypes = {
  shouldBeDefault: PropTypes.bool,
  setSidePanelButton: PropTypes.func.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
  setSidePanelLoading: PropTypes.func.isRequired,
}

BillingPaymentAdd.defaultProps = {
  shouldBeDefault: false,
}


export default BillingPaymentAdd
