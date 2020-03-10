import React from 'react'

import SidePanel from '../SidePanel'

const initialContext = {
  sidePanelContent: null,
  setSidePanelContent: () => {},
  sidePanelOpen: false,
  toggleSidePanel: () => {},
  sidePanelLoading: false,
  setSidePanelLoading: () => {},
}

const SidePanelContext = React.createContext(initialContext)
SidePanelContext.displayName = 'SidePanelContext'

const SidePanelContextProvider = ({ children }) => {
  const [sidePanelContent, setSidePanelContent] = React.useState(null)
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)
  const [sidePanelLoading, setSidePanelLoading] = React.useState(false)

  const toggleSidePanel = (state) => {
    const newState = typeof state === 'boolean' ? state : !sidePanelOpen
    setSidePanelOpen(newState)
  }

  return (
    // The context provider
    <SidePanelContext.Provider
      value={{
        sidePanelContent,
        setSidePanelContent,
        sidePanelOpen,
        toggleSidePanel,
        sidePanelLoading,
        setSidePanelLoading,
      }}
    >
      <>
        {/* The side panel */}
        <SidePanel
          content={sidePanelContent}
          setContent={setSidePanelContent}
          isOpen={sidePanelOpen}
          toggle={toggleSidePanel}
          isLoading={sidePanelLoading}
        />
        {/* The child content */}
        {children}
      </>
    </SidePanelContext.Provider>
  )
}

export { SidePanelContext, SidePanelContextProvider }
