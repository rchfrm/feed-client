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

  // * GLOBAL POST SETTINGS

  // OPEN GLOBAL POST SETTINGS
  const goToGlobalPostSettings = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsSettings />)
    setSidePanelContentLabel('Post Settings')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
  // OPEN GLOBAL POST LINKS
  const goToLinksBank = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsLinks />)
    setSidePanelContentLabel('Post Links')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
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

  return { goToGlobalPostSettings, goToLinksBank }
}

export default usePostsSidePanel
