import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import AddPaymentForm from '@/app/AddPaymentForm'

import BillingPaymentAddSuccess from '@/app/BillingPaymentAddSuccess'

import copy from '@/app/copy/billingCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'

const BillingPaymentAdd = ({
  shouldBeDefault,
  toggleSidePanel,
  setSidePanelButton,
  setSidePanelLoading,
  sidePanelLoading,
}) => {
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  // HANDLE SUCCESS
  const [paymentMethod, setPaymentMethod] = React.useState(null)
  const [success, setSuccess] = React.useState(false)

  // CHANGE SIDEPANEL BUTTON on MOUNT
  React.useEffect(() => {
    const button = <Button version="green" disabled={!isFormValid} onClick={addPaymentMethod}>Submit</Button>
    setSidePanelButton(button)
  }, [isFormValid, addPaymentMethod, setSidePanelButton])

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
          <AddPaymentForm
            setAddPaymentMethod={setAddPaymentMethod}
            setPaymentMethod={setPaymentMethod}
            setSuccess={setSuccess}
            shouldBeDefault={shouldBeDefault}
            isFormValid={isFormValid}
            setIsFormValid={setIsFormValid}
            isLoading={sidePanelLoading}
            setIsLoading={setSidePanelLoading}
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
}

BillingPaymentAdd.defaultProps = {
  shouldBeDefault: false,
}


export default BillingPaymentAdd
