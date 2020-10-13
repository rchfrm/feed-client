import React from 'react'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsSettings from '@/app/PostsSettings'

import * as utils from '@/helpers/utils'

const initialState = {
  togglePromotionGlobal: () => () => {},
  setTogglePromotionGlobal: () => {},
  goToPostSettings: () => {},
}

const PostsContext = React.createContext(initialState)

PostsContext.displayName = 'PostsContext'

const PostsContextProvider = ({ children }) => {
  // * OTHER CONTEXTS
  // ARTIST context
  const {
    artistId,
  } = React.useContext(ArtistContext)
  // SIDE PANEL context
  const {
    setSidePanelContent,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // * SET DEFAULT STATES
  // TOGGLE PROMOTION GLOBAL
  const [togglePromotionGlobal, setTogglePromotionGlobal] = React.useState(initialState.togglePromotionGlobal)

  // * OPEN POST SETTINGS
  const goToPostSettings = React.useCallback(() => {
    setSidePanelContent(<PostsSettings togglePromotionGlobal={togglePromotionGlobal} />)
    toggleSidePanel(true)
  }, [setSidePanelContent, toggleSidePanel, togglePromotionGlobal])

  return (
    <PostsContext.Provider
      value={{
        togglePromotionGlobal,
        setTogglePromotionGlobal,
        goToPostSettings,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
