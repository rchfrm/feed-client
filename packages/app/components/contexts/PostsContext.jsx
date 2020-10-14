import React from 'react'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import PostsSettings from '@/app/PostsSettings'

import * as utils from '@/helpers/utils'

const initialState = {
  togglePromotionGlobal: () => () => {},
  setTogglePromotionGlobal: () => {},
  goToPostSettings: () => {},
  defaultLink: '',
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


  // * OPEN POST SETTINGS
  const goToPostSettings = React.useCallback(() => {
    setSidePanelButton(null)
    setSidePanelContent(<PostsSettings
      togglePromotionGlobal={togglePromotionGlobal}
      defaultLink={defaultLink}
      setDefaultLink={setDefaultLink}
    />)
    toggleSidePanel(true)
  }, [
    setSidePanelButton,
    setSidePanelContent,
    toggleSidePanel,
    togglePromotionGlobal,
    defaultLink,
  ])

  return (
    <PostsContext.Provider
      value={{
        togglePromotionGlobal,
        setTogglePromotionGlobal,
        goToPostSettings,
        defaultLink,
        setDefaultLink,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
