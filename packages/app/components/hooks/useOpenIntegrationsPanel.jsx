import React from 'react'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import IntegrationsPanel from '@/app/IntegrationsPanel'

const useOpenIntegrationsPanel = ({ goBack, location }) => {
  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // OPEN INTEGRATIONS PANEL
  const openIntegrationsPanel = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<IntegrationsPanel goBack={goBack} location={location} />)
    setSidePanelContentLabel('Integrations')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel, goBack, location])

  return openIntegrationsPanel
}

export default useOpenIntegrationsPanel
