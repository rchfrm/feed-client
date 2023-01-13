import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import PostCardSettings from '@/app/PostCardSettings'
import PostResults from '@/app/PostResults'
import PostDetails from '@/app/PostDetails'
import Button from '@/elements/Button'

const usePostsSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

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

  const goToPostSettings = React.useCallback(({
    post,
    postIndex,
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

  const goToPostResults = React.useCallback((results) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent((
      <PostResults
        results={results}
        className="md:max-w-none max-w-lg"
      />
    ))
    setSidePanelContentLabel('Post Links')
    toggleSidePanel(true)
  // eslint-disable-next-line
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  const goToPostDetails = React.useCallback(({ post }) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent((
      <PostDetails
        post={post}
        className="md:max-w-none max-w-lg"
      />
    ))
    setSidePanelContentLabel('Post Links')
    toggleSidePanel(true)
  // eslint-disable-next-line
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return {
    goToPostSettings,
    goToPostResults,
    goToPostDetails,
  }
}

export default usePostsSidePanel
