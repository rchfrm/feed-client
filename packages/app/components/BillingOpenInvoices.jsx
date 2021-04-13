import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import BillingInvoiceList from '@/app/BillingInvoiceList'

const BillingOpenInvoices = ({
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
    const content = <BillingInvoiceList setSidePanelLoading={setSidePanelLoading} />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>
    setSidePanelContent(content)
    setSidePanelContentLabel('Inovoice list')
    toggleSidePanel(true)
    setSidePanelButton(button)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, setSidePanelLoading])

  return (
    <div className={className}>
      <Button
        version="black small"
        className="w-full"
        onClick={(e) => {
          e.preventDefault()
          openInvoicesSidepanel()
        }}
      >
        View historic invoices
      </Button>
    </div>
  )
}

BillingOpenInvoices.propTypes = {
  className: PropTypes.string,
}

BillingOpenInvoices.defaultProps = {
  className: null,
}


export default BillingOpenInvoices
