import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { PostsContextProvider } from '@/app/contexts/PostsContext'

import PostsSettings from '@/app/PostsSettings'
import PostsLinks from '@/app/PostsLinks'

const usePostsSidePanel = () => {
  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // * OPEN POST SETTINGS
  const goToPostSettings = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsContextProvider><PostsSettings /></PostsContextProvider>)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, toggleSidePanel])
  // * OPEN POST LINKS
  const goToPostLinks = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsContextProvider><PostsLinks /></PostsContextProvider>)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, toggleSidePanel])

  return { goToPostSettings, goToPostLinks }
}

export default usePostsSidePanel
