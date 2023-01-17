import React from 'react'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import PostSettings from '@/app/PostSettings'
import PostResults from '@/app/PostResults'
import PostDetails from '@/app/PostDetails'
import ButtonNew from '@/elements/ButtonNew'

const usePostsSidePanel = () => {
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  const CLOSE_BUTTON = (
    <ButtonNew
      onClick={() => toggleSidePanel(false)}
      className="w-full rounded-none"
      trackComponentName="usePostsSidePanel"
    >
      Done
    </ButtonNew>
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
