import React from 'react'
import PropTypes from 'prop-types'

import BillingOrganisationInvite from '@/app/BillingOrganisationInvite'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

const BillingOpenUsers = ({
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

  // OPEN TRANSFER PROFILE SIDEPANEL
  const openTransferProfileSidepanel = React.useCallback(() => {
    const content = (
      <BillingOrganisationInvite
        toggleSidePanel={toggleSidePanel}
        setSidePanelButton={setSidePanelButton}
        setSidePanelLoading={setSidePanelLoading}
      />
    )
    setSidePanelContent(content)
    setSidePanelContentLabel('Manage profiles')
    toggleSidePanel(true)
  }, [setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, setSidePanelButton, setSidePanelLoading])

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
        Send an invite
      </Button>
    </div>
  )
}

BillingOpenUsers.propTypes = {
  className: PropTypes.string,
}

BillingOpenUsers.defaultProps = {
  className: null,
}


export default BillingOpenUsers
