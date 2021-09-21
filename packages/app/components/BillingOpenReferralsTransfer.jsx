import React from 'react'
import PropTypes from 'prop-types'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import BillingReferralsTransfer from '@/app/BillingReferralsTransfer'

import useBillingStore from '@/app/stores/billingStore'

import { track } from '@/app/helpers/trackingHelpers'

const getOrganisation = state => state.organisation

const BillingOpenReferralsTransfer = ({
  className,
}) => {
  // SIDE PANEL
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelLoading,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const { id: organisationId } = useBillingStore(getOrganisation)
  // OPEN TRANSFER CREDITS PANEL
  const openReferralsTransferSidepanel = React.useCallback(() => {
    const content = <BillingReferralsTransfer setSidePanelLoading={setSidePanelLoading} />
    setSidePanelContent(content)
    setSidePanelContentLabel('Transfer credits')
    toggleSidePanel(true)
    // Track
    track('billing_transfer_credits', { organisationId })
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelLoading, organisationId])

  return (
    <div className={className}>
      <Button
        version="black small"
        className="w-full"
        onClick={(e) => {
          e.preventDefault()
          openReferralsTransferSidepanel()
        }}
      >
        Transfer credits
      </Button>
    </div>
  )
}

BillingOpenReferralsTransfer.propTypes = {
  className: PropTypes.string,
}

BillingOpenReferralsTransfer.defaultProps = {
  className: null,
}

export default BillingOpenReferralsTransfer
