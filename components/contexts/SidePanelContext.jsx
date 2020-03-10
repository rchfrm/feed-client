import React from 'react'

import SidePanel from '../SidePanel'

const initialContext = {
  sidePanelContent: null,
  setSidePanelContent: () => {},
  sidePanelOpen: false,
  toggleSidePanel: () => {},
}

const SidePanelContext = React.createContext(initialContext)
SidePanelContext.displayName = 'SidePanelContext'

const SidePanelContextProvider = ({ children }) => {
  const [sidePanelContent, setSidePanelContent] = React.useState(null)
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)

  const toggleSidePanel = (state) => {
    const newState = typeof state === 'boolean' ? state : !sidePanelOpen
    setSidePanelOpen(newState)
  }

  return (
    <SidePanelContext.Provider
      value={{
        sidePanelContent,
        setSidePanelContent,
        sidePanelOpen,
        toggleSidePanel,
      }}
    >
      <>
        <SidePanel
          content={sidePanelContent}
          setContent={setSidePanelContent}
          isOpen={sidePanelOpen}
          toggle={toggleSidePanel}
        />
        {children}
      </>
    </SidePanelContext.Provider>
  )
}

export { SidePanelContext, SidePanelContextProvider }
