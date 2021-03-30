import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import BillingPaymentAdd from '@/app/BillingPaymentAdd'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

const BillingOpenPayments = ({
  contentType,
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
    setSidePanelContent(<BillingPaymentAdd toggleSidePanel={toggleSidePanel} setSidePanelButton={setSidePanelButton} />)
    setSidePanelContentLabel('Add payment method')
    toggleSidePanel(true)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton])
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
  className: PropTypes.string,
}

BillingOpenPayments.defaultProps = {
  className: null,
}


export default BillingOpenPayments
