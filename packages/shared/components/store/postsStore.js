import create from 'zustand'

import * as postsHelpers from '@/app/helpers/postsHelpers'

const initialState = {
  artistId: '',
  artist: {},
  defaultLink: {},
  savedLinks: [],
  savedFolders: [],
  nestedLinks: [],
  integrations: [],
  togglePromotionGlobal: () => {},
}

// * DEFAULT LINK
const getDefaultLink = (links) => {
  return links.find(({ defaultLink }) => defaultLink)
}

// * FETCH LINKS

const formatNestedLinks = ({ links, folders }) => {
  // Nest links into folders
  const foldersWithLinks = folders.map((folder) => {
    // Get links that live in the folder
    const { linkIds } = folder
    const relatedLinks = linkIds.reduce((allLinks, linkId) => {
      const folderLinks = links.filter(({ id }) => id === linkId)
      return [...allLinks, ...folderLinks]
    }, [])
    return { ...folder, links: relatedLinks }
  })
  // Get links that aren't nested
  const defaultFolderId = '_default'
  const looseLinks = links.filter(({ folderId }) => folderId === defaultFolderId)
  // Return array of folders and loose links
  return [...foldersWithLinks, ...looseLinks]
}

// Fetch links from server and update store (or return cached links)
const fetchLinks = (set, get) => async (action) => {
  const { savedLinks, artistId } = get()
  // If there already are links and we not force, no need to reset data
  if (savedLinks.length && action !== 'force') return { error: null }
  // Else fetch links from server
  const { data, error } = await postsHelpers.fetchSavedLinks(artistId, 'dummy')
  const { links, folders, integrations } = data
  console.log('links', links)
  // Create array of links in folders for display
  const nestedLinks = formatNestedLinks({ links, folders })
  console.log('nestedLinks', nestedLinks)
  // Get default link
  const defaultLink = getDefaultLink(links)
  // Cache links and folders
  set({
    savedLinks: links,
    savedFolders: folders,
    nestedLinks,
    integrations,
    defaultLink,
  })
  // Return data
  return { error }
}

const [postsStore] = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  artist: initialState.artist,
  defaultLink: initialState.defaultLink,
  savedLinks: initialState.savedLinks,
  savedFolders: initialState.savedFolders,
  nestedLinks: initialState.nestedLinks,
  integrations: initialState.integrations,
  togglePromotionGlobal: initialState.togglePromotionGlobal,
  // GETTERS
  fetchLinks: fetchLinks(set, get),
  // SETTERS
  setTogglePromotionGlobal: (togglePromotionGlobal) => set({ togglePromotionGlobal }),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  init: (artist) => {
    set({
      artist,
      artistId: artist.id,
    })
    get().clearLinks()
  },
  clearAll: () => set(initialState),
}))

export default postsStore
