import create from 'zustand'

import * as postsHelpers from '@/app/helpers/postsHelpers'
import { formatAndFilterIntegrations } from '@/app/helpers/integrationHelpers'
import { track } from '@/app/helpers/trackingHelpers'

const initialState = {
  artistId: '',
  isMusician: false,
  artist: {},
  defaultLink: {},
  savedLinks: [],
  savedFolders: [],
  nestedLinks: [],
  integrations: [],
  linksLoading: false,
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
  const { savedLinks, artistId, linksLoading, artist } = get()
  // Stop here if links are already loading
  if (linksLoading) return
  set({ linksLoading: true })
  // If there already are links and we not force, no need to reset data
  if (savedLinks.length && action !== 'force') return
  // Set links as loading
  set({ linksLoading: true })
  // Else fetch links from server
  const { res, error } = await postsHelpers.fetchSavedLinks(artistId)
  set({ linksLoading: false })
  // Handle error
  if (error) {
    track({
      category: 'links',
      action: 'Error fetching links',
      description: error.message,
      error: true,
    })
    return { error }
  }
  const { links, folders, integrations } = res
  // Format integrations
  const { isMusician } = artist
  const formattedIntegrations = formatAndFilterIntegrations(integrations, isMusician, true)
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
    integrations: formattedIntegrations,
    defaultLink,
    linksLoading: false,
  })
}

const [postsStore] = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  artist: initialState.artist,
  isMusician: initialState.isMusician,
  defaultLink: initialState.defaultLink,
  savedLinks: initialState.savedLinks,
  savedFolders: initialState.savedFolders,
  nestedLinks: initialState.nestedLinks,
  integrations: initialState.integrations,
  linksLoading: initialState.linksLoading,
  togglePromotionGlobal: initialState.togglePromotionGlobal,
  // GETTERS
  fetchLinks: fetchLinks(set, get),
  // SETTERS
  setTogglePromotionGlobal: (togglePromotionGlobal) => set({ togglePromotionGlobal }),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  init: (artist, action = 'clearLinks') => {
    // Set artist details
    set({
      artist,
      artistId: artist.id,
      linksLoading: false,
    })
    // Fetch links
    if (action === 'fetchLinks') {
      get().fetchLinks('force')
      return
    }
    // Clear links
    get().clearLinks()
  },
  clearAll: () => set(initialState),
}))

export default postsStore
