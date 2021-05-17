import React from 'react'
import PropTypes from 'prop-types'

import BillingTransferProfile from '@/app/BillingTransferProfile'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import useBillingStore from '@/app/stores/billingStore'

import { track } from '@/app/helpers/trackingHelpers'

const getOrganisation = state => state.organisation

const BillingOpenProfiles = ({
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
  const openTransferProfileSidepanel = React.useCallback(() => {
    const content = <BillingTransferProfile setSidePanelLoading={setSidePanelLoading} />
    const button = <Button version="green" onClick={() => toggleSidePanel(false)}>Send</Button>
    setSidePanelContent(content)
    setSidePanelContentLabel('Profiles list')
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
          openTransferProfileSidepanel()
        }}
      >
        Manage profiles
      </Button>
    </div>
  )
}

BillingOpenProfiles.propTypes = {
  className: PropTypes.string,
}

BillingOpenProfiles.defaultProps = {
  className: null,
}


export default BillingOpenProfiles
