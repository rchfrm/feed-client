import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import IntegrationsPanel from '@/app/IntegrationsPanel'

const useOpenIntegrationsPanel = ({ goBack }) => {
  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // OPEN INTEGRATIONS PANEL
  const openIntegrationsPanel = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<IntegrationsPanel goBack={goBack} />)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, toggleSidePanel, goBack])

  return openIntegrationsPanel
}

export default useOpenIntegrationsPanel
