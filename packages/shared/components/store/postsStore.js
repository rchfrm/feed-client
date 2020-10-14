import create from 'zustand'

import * as postsHelpers from '@/app/helpers/postsHelpers'

const initialState = {
  artistId: '',
  artist: {},
  defaultLink: {},
  savedLinks: null,
  fetchLinks: () => {},
  init: () => {},
  clearLinks: () => {},
}

// * DEFAULT LINK
const getDefaultLink = (artist) => {
  const dummyDefaultLink = {
    name: 'Best music ever with a really long name',
    id: 'best-music-ever',
    href: 'https://test/com',
  }
  const { defaultLink = dummyDefaultLink } = artist
  return defaultLink
}

// * FETCH LINKS
const fetchLinks = (set, get) => async (action) => {
  const { savedLinks, artistId } = get()
  // If there already are links and we not force, return cached links
  if (savedLinks && action !== 'force') return { error: null }
  // Else fetch links from server
  const { links, error } = await postsHelpers.fetchSavedLinks(artistId, 'dummy')
  // Cache links
  set({ savedLinks: links })
  // Return data
  return { error }
}

const [postsStore] = create((set, get) => ({
  artistId: initialState.artistId,
  artist: initialState.artist,
  defaultLink: initialState.defaultLink,
  savedLinks: initialState.savedLinks,
  fetchLinks: fetchLinks(set, get),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  init: (artist) => {
    set({
      artist,
      artistId: artist.id,
      defaultLink: getDefaultLink(artist),
    })
    get().clearLinks()
  },
}))

export default postsStore
