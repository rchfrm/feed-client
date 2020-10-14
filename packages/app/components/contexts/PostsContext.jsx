import React from 'react'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as utils from '@/helpers/utils'

const initialState = {
  togglePromotionGlobal: () => () => {},
  setTogglePromotionGlobal: () => {},
  defaultLink: {},
  setDefaultLink: () => {},
}

const PostsContext = React.createContext(initialState)

PostsContext.displayName = 'PostsContext'

const PostsContextProvider = ({ children }) => {
  // * OTHER CONTEXTS
  // ARTIST context
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)
  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // * DEFAULT STATES
  // TOGGLE PROMOTION GLOBAL
  const [togglePromotionGlobal, setTogglePromotionGlobal] = React.useState(initialState.togglePromotionGlobal)
  // DEFAULT LINK
  const [defaultLink, setDefaultLink] = React.useState(initialState.defaultLink)
  // Update default link when artist changes
  React.useEffect(() => {
    if (artistId) {
      const dummyDefaultLink = {
        name: 'Best music ever with a really long name',
        id: 'best-music-ever',
        href: 'https://test/com',
      }
      const { defaultLink = dummyDefaultLink } = artist
      setDefaultLink(defaultLink)
    }
  // eslint-disable-next-line
  }, [artistId])

  return (
    <PostsContext.Provider
      value={{
        togglePromotionGlobal,
        setTogglePromotionGlobal,
        defaultLink,
        setDefaultLink,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
