import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import Button from '@/elements/Button'

import BillingHandleFailedInvoice from '@/app/BillingHandleFailedInvoice'
import * as invoiceHelpers from '@/app/helpers/invoiceHelpers'

const BillingOpenFailedInvoice = ({
  className,
  organisationId,
  updateLatestInvoice,
}) => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // OPEN ADD PAYMENT METHOD
  const openInvoicesSidepanel = React.useCallback(() => {
    const handleSidepanelClose = async () => {
      toggleSidePanel(false)
      const { res: latestInvoice, error } = await invoiceHelpers.fetchLatestInvoice(organisationId)
      if (error) {
        return
      }
      updateLatestInvoice(latestInvoice)
    }

    const content = <BillingHandleFailedInvoice />
    const button = <Button version="black" onClick={handleSidepanelClose} trackComponentName="BillingOpenFailedInvoice">Back</Button>
    setSidePanelContent(content)
    setSidePanelContentLabel('Inovoice list')
    toggleSidePanel(true)
    setSidePanelButton(button)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, organisationId, updateLatestInvoice])

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
        trackComponentName="BillingOpenFailedInvoice"
      >
        Handle failed payment
      </Button>
    </div>
  )
}

BillingOpenFailedInvoice.propTypes = {
  organisationId: PropTypes.string.isRequired,
  updateLatestInvoice: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BillingOpenFailedInvoice.defaultProps = {
  className: null,
}


export default BillingOpenFailedInvoice
