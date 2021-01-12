import React from 'react'
import Router, { useRouter } from 'next/router'

import SidePanel from '@/app/SidePanel'

import { track } from '@/app/helpers/trackingHelpers'

const initialContext = {
  sidePanelContent: null,
  setSidePanelContent: () => {},
  sidePanelButton: null,
  setSidePanelButton: () => {},
  sidePanelOpen: false,
  toggleSidePanel: () => {},
  sidePanelLoading: false,
  setSidePanelLoading: () => {},
  disableDrag: false,
  setDisableDrag: () => {},
  setOnSidepanelClose: () => {},
}

const SidePanelContext = React.createContext(initialContext)
SidePanelContext.displayName = 'SidePanelContext'

const SidePanelContextProvider = ({ children }) => {
  const [sidePanelContent, setSidePanelContent] = React.useState(null)
  const [sidePanelButton, setSidePanelButton] = React.useState(null)
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)
  const [sidePanelLoading, setSidePanelLoading] = React.useState(false)
  const [onSidepanelClose, setOnSidepanelClose] = React.useState(null)

  // TRACKING
  const sidePanelContentLabel = React.useRef('')
  const setSidePanelContentLabel = React.useCallback((label) => {
    sidePanelContentLabel.current = label
  }, [])

  // GET CLOSE METHOD
  // Get ROUTE info
  const { query, pathname } = useRouter()
  const [pageQuery] = Object.keys(query)
  const closeSidePanel = React.useCallback(() => {
    setSidePanelLoading(false)
    // If there's no page query, then simply close
    if (!pageQuery) return setSidePanelOpen(false)
    // If there is a page query, then just remove it
    Router.push(pathname)
  }, [pageQuery, pathname])

  const toggleSidePanel = React.useCallback((state) => {
    const newState = typeof state === 'boolean' ? state : !sidePanelOpen
    // TRACK
    track({
      action: 'sidepanel_toggle',
      category: 'generic',
      label: sidePanelContentLabel.current,
      value: !newState ? 'close' : 'open',
    })
    // Closing
    if (!newState) return closeSidePanel()
    // Opening
    setSidePanelOpen(newState)
  }, [setSidePanelOpen, closeSidePanel, sidePanelOpen, sidePanelContentLabel])

  // Close side panel when navigating pages
  React.useEffect(() => {
    Router.events.on('routeChangeStart', closeSidePanel)
    return () => {
      Router.events.off('routeChangeStart', closeSidePanel)
    }
  }, [])

  // DISABLE DRAGGING
  const [disableDrag, setDisableDrag] = React.useState(false)

  return (
    // The context provider
    <SidePanelContext.Provider
      value={{
        sidePanelContent,
        setSidePanelContent,
        setSidePanelContentLabel,
        sidePanelButton,
        setSidePanelButton,
        setOnSidepanelClose,
        sidePanelOpen,
        toggleSidePanel,
        sidePanelLoading,
        setSidePanelLoading,
        disableDrag,
        setDisableDrag,
      }}
    >
      <>
        {/* The side panel */}
        <SidePanel
          content={sidePanelContent}
          setContent={setSidePanelContent}
          button={sidePanelButton}
          isOpen={sidePanelOpen}
          toggle={toggleSidePanel}
          isLoading={sidePanelLoading}
          disableDrag={disableDrag}
          onSidepanelClose={onSidepanelClose}
        />
        {children}
      </>
    </SidePanelContext.Provider>
  )
}

export { SidePanelContext, SidePanelContextProvider }
