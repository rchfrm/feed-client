import create from 'zustand'
import get from 'lodash/get'

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
  linkBankError: null,
  togglePromotionGlobal: () => {},
}

// * INTEGRATIONS
const fetchIntegrations = (artist) => {
  const { isMusician, integrations } = artist
  return formatAndFilterIntegrations(integrations, isMusician, true)
}

// * DEFAULT LINK
const getDefaultLink = ({ nestedLinks, artist, linkId }) => {
  const defaultLinkId = linkId || get(artist, ['preferences', 'posts', 'default_link_id'], '')
  return linksHelpers.getLinkById(nestedLinks, defaultLinkId) || {}
}

// * FETCH LINKS

const formatServerLinks = (folders) => {
  // Now remove loose links and integrations
  const foldersTidied = folders.filter(({ id }) => id !== integrationsFolderId)
  // Return array of folders and loose links
  return foldersTidied.map((item) => { return { ...item, type: 'folder' } })
}

// Fetch links from server and update store (or return cached links)
const fetchLinks = (set, get) => async (action) => {
  const { savedLinks, linksLoading, artist, artistId } = get()
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
    const linkBankError = { message: `Error fetching links. ${error.message}` }
    set({ linkBankError })
    return { error }
  }
  const { folders } = res
  // Create array of links in folders for display
  const nestedLinks = formatServerLinks(folders)
  // Create an array of folder IDs
  const savedFolders = nestedLinks.filter(({ type, id }) => type === 'folder' && id !== defaultFolderId)
  // Get default link
  const defaultLink = getDefaultLink({ artist, nestedLinks })
  // Cache links and folders
  set({
    savedFolders,
    nestedLinks,
    linksLoading: false,
    linkBankError: null,
    defaultLink,
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
  newArtist,
  newLink,
  oldLink,
  newFolder,
  oldFolder,
}) => {
  // UPDATE DEFAULT LINK
  if (action === 'updateDefault') {
    const { nestedLinks } = get()
    const defaultLink = getDefaultLink({ artist: newArtist, nestedLinks })
    return set({ defaultLink })
  }
  // LINK
  if (newLink) {
    const nestedLinks = getUpdatedLinks(set, get)(action, { newLink, oldLink })
    return set({ nestedLinks })
  }
  // FOLDER
  const nestedLinks = getUpdatedFolders(set, get)(action, { newFolder, oldFolder })
  set({ nestedLinks })
}


// EXPORT STORE
const [linksStore] = create((set, get) => ({
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
  linkBankError: initialState.linkBankError,
  togglePromotionGlobal: initialState.togglePromotionGlobal,
  // GETTERS
  fetchLinks: fetchLinks(set, get),
  // SETTERS
  updateLinksStore: updateLinksStore(set, get),
  setTogglePromotionGlobal: (togglePromotionGlobal) => set({ togglePromotionGlobal }),
  setLinkBankError: (error) => set({ linkBankError: error }),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  init: (artist, action = 'clearLinks') => {
    // Set artist details
    set({
      artist,
      artistId: artist.id,
      linksLoading: false,
    })
    // Set integrations
    const integrations = fetchIntegrations(artist)
    set({ integrations })
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

export default linksStore
