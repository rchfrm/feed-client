import React from 'react'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as postsHelpers from '@/app/helpers/postsHelpers'
// import * as utils from '@/helpers/utils'

const initialState = {
  togglePromotionGlobal: () => () => {},
  setTogglePromotionGlobal: () => {},
  defaultLink: {},
  setDefaultLink: () => {},
  savedLinks: null,
  setSavedLinks: () => {},
  fetchLinks: () => {},
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

  // * SAVED LINKS
  const [savedLinks, setSavedLinks] = React.useState(initialState.savedLinks)
  // Fetch links
  const fetchLinks = React.useCallback(async (action) => {
    console.log('savedLinks', savedLinks)
    // If there already are links and we not force, return cached links
    if (savedLinks && action !== 'force') return { error: null }
    console.log('load links')
    // Else fetch links from server
    const { links, error } = await postsHelpers.fetchSavedLinks(artistId, 'dummy')
    // Cache links
    setSavedLinks(links)
    // Return data
    return { error }
  }, [artistId, savedLinks])
  // Empty links when artist changes
  React.useEffect(() => {
    console.log('clear link')
    setSavedLinks(null)
  }, [artistId])

  return (
    <PostsContext.Provider
      value={{
        togglePromotionGlobal,
        setTogglePromotionGlobal,
        defaultLink,
        setDefaultLink,
        savedLinks,
        setSavedLinks,
        fetchLinks,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
