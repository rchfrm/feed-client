import create from 'zustand'

import * as linksHelpers from '@/app/helpers/linksHelpers'
import { getDefaultLinkId } from '@/app/helpers/artistHelpers'

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
}

// * INTEGRATIONS
const createIntegrationLinks = (folders) => {
  const integrationsFolder = folders.find(({ id }) => id === integrationsFolderId)
  return integrationsFolder.links.map(({ id, tags: { platform } }) => {
    return { id, platform }
  })
}

const fetchIntegrations = ({ artist, folders }) => {
  const { integrations } = artist
  // Remove empty integrations
  const filteredArtistIntegrations = integrations.reduce((arr, integration) => {
    if (!integration.accountId) return arr
    return [...arr, integration]
  }, [])
  // Get integration links
  const integrationLinks = createIntegrationLinks(folders)
  // Merge artist integrations with integration links info
  return filteredArtistIntegrations.map((integration) => {
    const { platform } = integration
    const integrationLink = integrationLinks.find(({ platform: integrationPlatform }) => {
      return integrationPlatform === platform
    })
    return {
      ...integration,
      id: integrationLink.id,
    }
  })
}

// * DEFAULT LINK
const getDefaultLink = ({ linkFolders, artist, linkId }) => {
  const defaultLinkId = linkId || getDefaultLinkId(artist)
  return linksHelpers.getLinkById(linkFolders, defaultLinkId) || {}
}

// * FETCH LINKS

const formatServerLinks = (folders, defaultLink) => {
  const { id: defaultLinkId } = defaultLink
  // Format links
  const foldersTidied = folders
    // Remove integrations folder
    .filter(({ id }) => id !== integrationsFolderId)
    // Add add type key to folders, and
    // Add isDefaultLink to default link
    .map((item) => {
      const { links } = item
      const linksWithDefaultKey = links.map((link) => {
        const { id } = link
        if (id === defaultLinkId) {
          return {
            ...link,
            isDefaultLink: true,
          }
        }
        return link
      })
      return {
        ...item,
        links: linksWithDefaultKey,
        type: 'folder',
      }
    })
  return foldersTidied
}

// Fetch links from server and update store (or return cached links)
const fetchLinks = (set, get) => async (action, artist) => {
  const { savedLinks, linksLoading, artistId } = get()
  // Stop here if links are already loading
  if (linksLoading) return
  set({ linksLoading: true })
  // If there already are links and we not force, no need to reset data
  if (savedLinks.length && action !== 'force') return
  // Set links as loading
  set({ linksLoading: true })
  // Else fetch links from server
  const { res, error } = await linksHelpers.fetchSavedLinks(artistId)
  console.log('FETCH LINKS', 'res', res)
  // Handle error
  if (error) {
    const linkBankError = { message: `Error fetching links. ${error.message}` }
    set({ linkBankError, linksLoading: false })
    return { error }
  }
  const { folders } = res
  console.log('folders', folders)
  // Get default link
  const defaultLink = getDefaultLink({ artist, linkFolders: folders })
  // Create array of integration links
  const integrations = fetchIntegrations({ artist, folders })
  // Create array of links in folders for display
  const nestedLinks = formatServerLinks(folders, defaultLink)
  // Create an array of folder IDs
  const savedFolders = nestedLinks.filter(({ type, id }) => type === 'folder' && id !== defaultFolderId)
  // Cache links and folders
  set({
    savedFolders,
    nestedLinks,
    integrations,
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
    const defaultLink = getDefaultLink({ artist: newArtist, linkFolders: nestedLinks })
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
  // GETTERS
  fetchLinks: fetchLinks(set, get),
  // SETTERS
  updateLinksStore: updateLinksStore(set, get),
  setLinkBankError: (error) => set({ linkBankError: error }),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  init: async (artist, action = 'clearLinks') => {
    // Set artist details
    set({
      artist,
      artistId: artist.id,
      linksLoading: false,
    })
    // Fetch links
    if (action === 'fetchLinks') {
      await get().fetchLinks('force', artist)
      return
    }
    // Clear links
    get().clearLinks()
  },
  clearAll: () => set(initialState),
}))

export default linksStore
