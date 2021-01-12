import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsSettings from '@/app/PostsSettings'
// eslint-disable-next-line
import PostsLinks from '@/app/PostsLinks'

const usePostsSidePanel = () => {
  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)
  // * OPEN POST SETTINGS
  const goToPostSettings = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsSettings />)
    setSidePanelContentLabel('Post Settings')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
  // * OPEN POST LINKS
  const goToPostLinks = React.useCallback(({ useSelectMode = false }) => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsLinks useSelectMode={useSelectMode} />)
    setSidePanelContentLabel('Post Links')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return { goToPostSettings, goToPostLinks }
}

export default usePostsSidePanel
