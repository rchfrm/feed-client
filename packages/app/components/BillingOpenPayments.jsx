import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import BillingPaymentAdd from '@/app/BillingPaymentAdd'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

const BillingOpenPayments = ({
  contentType,
  setAsDefault,
  className,
}) => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // OPEN PAYMENT METHODS
  const openPaymentMethods = React.useCallback(() => {
    console.log('OPEN METHODS')
  }, [])

  // OPEN ADD PAYMENT METHOD
  const openAddPaymentMethod = React.useCallback(() => {
    const content = (
      <BillingPaymentAdd
        setAsDefault={setAsDefault}
        toggleSidePanel={toggleSidePanel}
        setSidePanelButton={setSidePanelButton}
      />
    )
    setSidePanelContent(content)
    setSidePanelContentLabel('Add payment method')
    toggleSidePanel(true)
  }, [setAsDefault, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton])
  return (
    <div className={className}>
      <Button
        version="green"
        onClick={(e) => {
          e.preventDefault()
          if (contentType === 'add-payment') {
            openAddPaymentMethod()
            return
          }
          openPaymentMethods()
        }}
      >
        {contentType === 'add-payment' ? 'Add payment method' : 'Show payment methods'}
      </Button>
    </div>
  )
}

BillingOpenPayments.propTypes = {
  contentType: PropTypes.string.isRequired,
  setAsDefault: PropTypes.bool,
  className: PropTypes.string,
}

BillingOpenPayments.defaultProps = {
  setAsDefault: false,
  className: null,
}


export default BillingOpenPayments
