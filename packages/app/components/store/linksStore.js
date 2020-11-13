import create from 'zustand'
import produce from 'immer'

import * as linksHelpers from '@/app/helpers/linksHelpers'
import { getDefaultLinkId } from '@/app/helpers/artistHelpers'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

const { integrationsFolderId, folderStatesStorageKey } = linksHelpers

const initialState = {
  artistId: '',
  isMusician: false,
  defaultLink: {},
  savedLinks: [],
  savedFolders: [],
  nestedLinks: [],
  folderStates: [], // are folders open or not
  linksLoading: false,
  linkBankError: null,
}

const getFolderStateKey = (artistId) => {
  return `${folderStatesStorageKey}_${artistId}`
}

// * FOLDER STATES
const locallyStoreFolderStates = (state, artistId) => {
  const stateKey = getFolderStateKey(artistId)
  setLocalStorage(stateKey, JSON.stringify(state))
}

const getInitialFolderState = (savedFolders, artistId) => {
  const stateKey = getFolderStateKey(artistId)
  const savedState = JSON.parse(getLocalStorage(stateKey))
  if (savedState) return savedState
  // If no saved state, build it here
  const initialState = savedFolders.reduce((obj, { id }) => {
    obj[id] = {
      id,
      open: true,
    }
    return obj
  }, {})
  locallyStoreFolderStates(initialState, artistId)
  return initialState
}

// * FOLDERS
const tidyFolders = (folders, defaultLinkId) => {
  return folders.map((item) => {
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
}

// Create array of saved folders with simplified info
const getSavedFolders = (nestedLinks) => {
  return nestedLinks.reduce((savedFolders, folder) => {
    const { id, type, is_default, name, links } = folder
    const totalLinks = links.length
    if (!totalLinks) return savedFolders
    if (type === 'folder' && is_default) return savedFolders
    return [...savedFolders, {
      id,
      name,
      totalLinks,
    }]
  }, [])
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
  return filteredArtistIntegrations.map((artistIntegration) => {
    const { platform } = artistIntegration
    const linkIntegration = integrationLinks.find(({ platform: integrationPlatform }) => {
      return integrationPlatform === platform
    })
    return {
      ...linkIntegration,
      ...artistIntegration,
      name: artistIntegration.titleVerbose,
    }
  })
}

// * DEFAULT LINK
const getDefaultLink = ({ linkFolders, artist, linkId }) => {
  const defaultLinkId = linkId || getDefaultLinkId(artist)
  return linksHelpers.getLinkById(linkFolders, defaultLinkId) || {}
}

// * FETCH LINKS

const formatServerLinks = ({ folders, defaultLink, artist }) => {
  const { id: defaultLinkId } = defaultLink
  // Update links in integration folder
  const integrationLinks = fetchIntegrations({ artist, folders })
  const integrationsFolderIndex = folders.findIndex(({ id }) => id === integrationsFolderId)
  const foldersUpdatedIntegrations = produce(folders, draftFolders => {
    draftFolders[integrationsFolderIndex].links = integrationLinks
  })
  // Format links
  // Add add type key to folders, and
  // Add isDefaultLink to default link
  return tidyFolders(foldersUpdatedIntegrations, defaultLinkId)
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
  // Handle error
  if (error) {
    const linkBankError = { message: `Error fetching links. ${error.message}` }
    set({ linkBankError, linksLoading: false })
    return { error }
  }
  const { folders } = res
  // Get default link
  const defaultLink = getDefaultLink({ artist, linkFolders: folders })
  // Create array of links in folders for display
  const nestedLinks = formatServerLinks({ folders, defaultLink, artist })
  // Create an array of folder IDs
  const savedFolders = getSavedFolders(nestedLinks)
  // Get folder states
  const folderStates = getInitialFolderState(savedFolders, artist.id)
  // Cache links and folders
  set({
    savedFolders,
    nestedLinks,
    linksLoading: false,
    linkBankError: null,
    folderStates,
    defaultLink,
  }, true)
}

// * UPDATE STATE

// UPDATE LINKS
const getUpdatedLinks = (set, get) => (action, { newLink, oldLink = {} }) => {
  const { nestedLinks } = get()
  // edit link
  if (action === 'edit') {
    return linksHelpers.afterEditLink({ newLink, oldLink, nestedLinks })
  }
  // delete link
  if (action === 'delete') {
    return linksHelpers.afterDeleteLink({ oldLink, nestedLinks })
  }
  // add link
  if (action === 'add') {
    return linksHelpers.afterAddLink({ newLink, nestedLinks })
  }
}

// UPDATE FOLDERS
const getUpdatedFolders = (set, get) => (action, { newFolder, oldFolder }) => {
  const { nestedLinks } = get()
  // edit folder
  if (action === 'edit') {
    return linksHelpers.afterEditFolder({ newFolder, oldFolder, nestedLinks })
  }
  // delete folder
  if (action === 'delete') {
    return linksHelpers.afterDeleteFolder({ oldFolder, nestedLinks })
  }
}

// UNIVERSAL UPDATE LINK STORE
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
  // GET UPDATED NESTED LINKS WHEN...
  const nestedLinks = newLink
    // ...Updating link
    ? getUpdatedLinks(set, get)(action, { newLink, oldLink })
    // ...Updating folder
    : getUpdatedFolders(set, get)(action, { newFolder, oldFolder })
  // GET UPDATED SAVED FOLDERS
  const savedFolders = getSavedFolders(nestedLinks)
  // UPDATE STORE
  set({ nestedLinks, savedFolders })
}

// UPDATE OPEN FOLDER STATE
const updateFolderStates = (set, get) => (folderId, isOpen = true) => {
  const { folderStates, artistId } = get()
  const newState = produce(folderStates, draftState => {
    // Handle not yet ready fodler
    if (!draftState[folderId]) {
      draftState[folderId] = {}
    }
    draftState[folderId].open = isOpen
  })
  // Set in store and local storage
  set({ folderStates: newState })
  locallyStoreFolderStates(newState, artistId)
}


// EXPORT STORE
const [linksStore] = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  isMusician: initialState.isMusician,
  defaultLink: initialState.defaultLink,
  savedLinks: initialState.savedLinks,
  savedFolders: initialState.savedFolders,
  nestedLinks: initialState.nestedLinks,
  folderStates: initialState.folderStates,
  linksLoading: initialState.linksLoading,
  linkBankError: initialState.linkBankError,
  // GETTERS
  fetchLinks: fetchLinks(set, get),
  // SETTERS
  updateLinksStore: updateLinksStore(set, get),
  updateFolderStates: updateFolderStates(set, get),
  setLinkBankError: (error) => set({ linkBankError: error }),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  init: async (artist, action = 'clearLinks') => {
    // Set artist details
    set({
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
  clearAll: () => set(initialState, true),
}))

export default linksStore
