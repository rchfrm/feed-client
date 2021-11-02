import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import BillingInvoiceList from '@/app/BillingInvoiceList'

import useBillingStore from '@/app/stores/billingStore'

import { track } from '@/helpers/trackingHelpers'

const getOrganisation = state => state.organisation

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

  const { id: organisationId } = useBillingStore(getOrganisation)
  // OPEN ADD PAYMENT METHOD
  const openInvoicesSidepanel = React.useCallback(() => {
    const content = <BillingInvoiceList setSidePanelLoading={setSidePanelLoading} trackComponentName="BillingOpenInvoices" />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Done</Button>
    setSidePanelContent(content)
    setSidePanelContentLabel('Inovoice list')
    toggleSidePanel(true)
    setSidePanelButton(button)
    // Track
    track('billing_view_invoices', { organisationId })
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, setSidePanelLoading, organisationId])

  return (
    <div className={className}>
      <Button
        version="black small"
        className="w-full"
        onClick={(e) => {
          e.preventDefault()
          openInvoicesSidepanel()
        }}
        trackComponentName="BillingOpenInvoices"
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
