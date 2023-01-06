import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import PostSettings from '@/app/PostSettings'
import PostMetrics from '@/app/PostMetrics'
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
    status,
    setPosts,
  }) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent((
      <PostSettings
        post={post}
        status={status}
        setPost={setPosts}
      />
    ))
    setSidePanelContentLabel('Post Settings')
    toggleSidePanel(true)
  // eslint-disable-next-line
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  const goToPostMetrics = React.useCallback((metrics) => {
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContent((
      <PostMetrics
        metrics={metrics}
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
    goToPostMetrics,
    goToPostDetails,
  }
}

export default usePostsSidePanel
