import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

import PostsSettings from '@/app/PostsSettings'
// eslint-disable-next-line
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

  // * SINGLE POST SETTINGS

  const CLOSE_BUTTON = (
    <Button onClick={() => toggleSidePanel(false)} version="green">
      Done
    </Button>
  )

  // SHOW POST SETTINGS
  const goToPostSettings = React.useCallback(({ post, postIndex, updatePost, isMissingDefaultLink }) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent((
      <PostCardSettings
        post={post}
        postIndex={postIndex}
        updatePost={updatePost}
        isMissingDefaultLink={isMissingDefaultLink}
      />
    ))
    setSidePanelContentLabel('Post Settings')
    toggleSidePanel(true)
  // eslint-disable-next-line
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])
  // OPEN GLOBAL POST LINKS
  const goToPostMetrics = React.useCallback(({ metrics, postType }) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent(<PostCardMetrics metrics={metrics} postType={postType} />)
    setSidePanelContentLabel('Post Links')
    toggleSidePanel(true)
  // eslint-disable-next-line
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return {
    goToGlobalPostSettings,
    goToPostSettings,
    goToPostMetrics,
  }
}

export default usePostsSidePanel
