import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsSettings from '@/app/PostsSettings'
// eslint-disable-next-line
import PostsLinks from '@/app/PostsLinks'

import PostCardSettings from '@/app/PostCardSettings'
import PostCardMetrics from '@/app/PostCardMetrics'

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

  // * SINGLE POST SETTINGS

  // SHOW POST SETTINGS
  const goToPostSettings = React.useCallback(({ post, postIndex, updateLink }) => {
    setSidePanelButton(null)
    setSidePanelContent(<PostCardSettings post={post} postIndex={postIndex} updateLink={updateLink} />)
    setSidePanelContentLabel('Post Settings')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
  // OPEN GLOBAL POST LINKS
  const goToPostMetrics = React.useCallback(({ metrics }) => {
    setSidePanelButton(null)
    setSidePanelContent(<PostCardMetrics metrics={metrics} />)
    setSidePanelContentLabel('Post Links')
    toggleSidePanel(true)
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return {
    goToGlobalPostSettings,
    goToLinksBank,
    goToPostSettings,
    goToPostMetrics,
  }
}

export default usePostsSidePanel
