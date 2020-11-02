import create from 'zustand'

import * as linksHelpers from '@/app/helpers/linksHelpers'
import { formatAndFilterIntegrations } from '@/app/helpers/integrationHelpers'

const { defaultFolderId, integrationsFolderId } = linksHelpers

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

const formatServerLinks = (folders) => {
  // Get loose links
  const { links: looseLinks } = folders.find(({ id }) => id === defaultFolderId)
  // Now remove loose links and integrations
  const foldersTidied = folders.filter(({ id }) => id !== integrationsFolderId)
  // Return array of folders and loose links
  return {
    nestedLinks: foldersTidied.map((item) => { return { ...item, type: 'folder' } }),
    looseLinks,
  }
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
  const { res, error } = await linksHelpers.fetchSavedLinks(artistId)
  set({ linksLoading: false })
  console.log('FETCH LINKS', 'res', res)
  // Handle error
  if (error) {
    return { error }
  }
  const { folders, integrations = [] } = res
  // Format integrations
  const { isMusician } = artist
  const formattedIntegrations = formatAndFilterIntegrations(integrations, isMusician, true)
  // Create array of links in folders for display
  const { nestedLinks, looseLinks } = formatServerLinks(folders)
  // Create an array of folder IDs
  const savedFolders = nestedLinks.filter(({ type, id }) => type === 'folder' && id !== defaultFolderId)
  // TODO Get default link
  // const defaultLink = getDefaultLink(folder)
  // Cache links and folders
  set({
    savedFolders,
    nestedLinks,
    looseLinks,
    integrations: formattedIntegrations,
    linksLoading: false,
    // defaultLink,
  })
}

// * UPDATE STATE

// Update links
const getUpdatedLinks = (set, get) => (action, { newLink, oldLink = {} }) => {
  const { nestedLinks } = get()
  // EDIT LINK
  if (action === 'edit') {
    return linksHelpers.afterEditLink({ newLink, oldLink, nestedLinks })
  }
  // DELETE LINK
  if (action === 'delete') {
    return linksHelpers.afterDeleteLink({ oldLink, nestedLinks })
  }
  // ADD LINK
  if (action === 'add') {
    return linksHelpers.afterAddLink({ newLink, nestedLinks })
  }
}

// Update folders
const getUpdatedFolders = (set, get) => (action, { newFolder, oldFolder }) => {
  const { nestedLinks } = get()
  // EDIT FOLDER
  if (action === 'edit') {
    return linksHelpers.afterEditFolder({ newFolder, oldFolder, nestedLinks })
  }
  // DELETE FOLDER
  if (action === 'delete') {
    return linksHelpers.afterDeleteFolder({ oldFolder, nestedLinks })
  }
}

// Universal update link store
const updateLinksStore = (set, get) => (action, {
  newLink,
  oldLink,
  newFolder,
  oldFolder,
}) => {
  // LINK
  if (newLink) {
    const nestedLinks = getUpdatedLinks(set, get)(action, { newLink, oldLink })
    set({ nestedLinks })
    return
  }
  // FOLDER
  const nestedLinks = getUpdatedFolders(set, get)(action, { newFolder, oldFolder })
  set({ nestedLinks })
}


// EXPORT STORE
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
  updateLinksStore: updateLinksStore(set, get),
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
