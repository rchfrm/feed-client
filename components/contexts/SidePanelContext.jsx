import React from 'react'

import SidePanel from '../SidePanel'

const initialContext = {
  sidePanelContent: null,
  setSidePanelContent: () => {},
  sidePanelButton: null,
  setSidePanelButton: () => {},
  sidePanelOpen: false,
  toggleSidePanel: () => {},
  sidePanelLoading: false,
  setSidePanelLoading: () => {},
}

const SidePanelContext = React.createContext(initialContext)
SidePanelContext.displayName = 'SidePanelContext'

const SidePanelContextProvider = ({ children }) => {
  const [sidePanelContent, setSidePanelContent] = React.useState(null)
  const [sidePanelButton, setSidePanelButton] = React.useState(null)
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)
  const [sidePanelLoading, setSidePanelLoading] = React.useState(false)

  const toggleSidePanel = (state) => {
    const newState = typeof state === 'boolean' ? state : !sidePanelOpen
    setSidePanelOpen(newState)
  }

  console.log('side panel context maoun')

  return (
    // The context provider
    <SidePanelContext.Provider
      value={{
        sidePanelContent,
        setSidePanelContent,
        sidePanelButton,
        setSidePanelButton,
        sidePanelOpen,
        toggleSidePanel,
        sidePanelLoading,
        setSidePanelLoading,
      }}
    >
      <>
        {/* The side panel */}
        {sidePanelContent && sidePanelOpen && (
          <SidePanel
            content={sidePanelContent}
            setContent={setSidePanelContent}
            button={sidePanelButton}
            isOpen={sidePanelOpen}
            toggle={toggleSidePanel}
            isLoading={sidePanelLoading}
          />
        )}
        {/* The child content */}
        {children}
      </>
    </SidePanelContext.Provider>
  )
}

export { SidePanelContext, SidePanelContextProvider }
