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

const formatNestedLinks = (folders) => {
  // Get loose links
  const { defaultFolderId, integrationsFolderId } = postsHelpers
  const { links: looseLinks } = folders.find(({ id }) => id === defaultFolderId)
  // Now remove loose links and integrations
  const foldersTidied = folders.filter(({ id }) => id !== defaultFolderId && id !== integrationsFolderId)
  // Return array of folders and loose links
  return [
    ...foldersTidied.map((item) => { return { ...item, type: 'folder' } }),
    ...looseLinks.map((item) => { return { ...item, type: 'link' } }),
  ]
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
  console.log('FETCH LINKS', 'res', res)
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
  const { folders, integrations = [] } = res
  // Format integrations
  const { isMusician } = artist
  const formattedIntegrations = formatAndFilterIntegrations(integrations, isMusician, true)
  // Create array of links in folders for display
  const nestedLinks = formatNestedLinks(folders)
  // Create an array of folder IDs
  const savedFolders = nestedLinks.filter(({ type }) => type === 'folder').map(({ id }) => id)
  // TODO Get default link
  // const defaultLink = getDefaultLink(folder)
  // Cache links and folders
  set({
    savedFolders,
    nestedLinks,
    integrations: formattedIntegrations,
    linksLoading: false,
    // defaultLink,
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
