import React from 'react'
import PropTypes from 'prop-types'

import BillingTransferProfile from '@/app/BillingTransferProfile'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

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

  // OPEN TRANSFER PROFILE SIDEPANEL
  const openTransferProfileSidepanel = React.useCallback(() => {
    const content = (
      <BillingTransferProfile
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
        trackComponentName="BillingOpenProfiles"
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
