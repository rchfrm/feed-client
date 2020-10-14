import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { PostsContextProvider } from '@/app/contexts/PostsContext'

import PostsSettings from '@/app/PostsSettings'

const usePostsSettings = () => {
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

  return { goToPostSettings }
}

export default usePostsSettings
