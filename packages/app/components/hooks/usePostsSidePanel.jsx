import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

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
    setSidePanelContent(<PostsSettings />)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, toggleSidePanel])
  // * OPEN POST LINKS
  const goToPostLinks = React.useCallback(({ useSelectMode = false }) => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsLinks useSelectMode={useSelectMode} />)
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, toggleSidePanel])

  return { goToPostSettings, goToPostLinks }
}

export default usePostsSidePanel
