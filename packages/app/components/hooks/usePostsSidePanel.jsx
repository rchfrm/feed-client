import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import Button from '@/elements/Button'

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

  // * SINGLE POST SETTINGS

  const CLOSE_BUTTON = (
    <Button
      onClick={() => toggleSidePanel(false)}
      version="green"
      className="border-solid border-0 border-t-4"
      trackComponentName="usePostsSidePanel"
    >
      Done
    </Button>
  )

  // SHOW POST SETTINGS
  const goToPostSettings = React.useCallback(({
    post,
    postIndex,
    postToggleSetterType,
    updatePost,
    artistId,
    toggleCampaign,
    isMissingDefaultLink,
  }) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent((
      <PostCardSettings
        post={post}
        postIndex={postIndex}
        postToggleSetterType={postToggleSetterType}
        updatePost={updatePost}
        artistId={artistId}
        toggleCampaign={toggleCampaign}
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
    goToPostSettings,
    goToPostMetrics,
  }
}

export default usePostsSidePanel
