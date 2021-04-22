import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import BillingHandleFailedInvoice from '@/app/BillingHandleFailedInvoice'

const BillingOpenFailedInvoice = ({
  className,
}) => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    setSidePanelLoading,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // OPEN ADD PAYMENT METHOD
  const openInvoicesSidepanel = React.useCallback(() => {
    const content = <BillingHandleFailedInvoice setSidePanelLoading={setSidePanelLoading} setSidePanelButton={setSidePanelButton} />
    const button = <Button version="black" onClick={() => toggleSidePanel(false)}>Back</Button>
    setSidePanelContent(content)
    setSidePanelContentLabel('Inovoice list')
    toggleSidePanel(true)
    setSidePanelButton(button)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, setSidePanelLoading])

  return (
    <div className={className}>
      <Button
        label="Handle failed payment"
        version="red small"
        className="w-full"
        onClick={(e) => {
          e.preventDefault()
          openInvoicesSidepanel()
        }}
      >
        Handle failed payment
      </Button>
    </div>
  )
}

BillingOpenFailedInvoice.propTypes = {
  className: PropTypes.string,
}

BillingOpenFailedInvoice.defaultProps = {
  className: null,
}


export default BillingOpenFailedInvoice
