import create from 'zustand'
import produce from 'immer'

import * as linksHelpers from '@/app/helpers/linksHelpers'
import { getPreferences } from '@/app/helpers/artistHelpers'
import { getMinBudgets } from '@/app/helpers/budgetHelpers'

import { getLocalStorage, setLocalStorage, removeProtocolFromUrl, formatCurrency } from '@/helpers/utils'

const { integrationsFolderId, folderStatesStorageKey } = linksHelpers

const initialState = {
  artistId: '',
  isMusician: false,
  defaultLink: null,
  postsPreferences: {},
  conversionsPreferences: {},
  optimizationPreferences: {},
  currency: '',
  budget: 0,
  minConversionsBudget: 0,
  formattedMinConversionsBudget: '',
  isSpendingPaused: false,
  canRunConversions: false,
  conversionsEnabled: false,
  savedLinks: [],
  savedFolders: [],
  nestedLinks: [],
  folderStates: [], // are folders open or not
  isControlsLoading: false,
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

const buildFolderStates = (savedFolders, folderStates = {}) => {
  return savedFolders.reduce((obj, { id }) => {
    const { open = true } = folderStates[id] || {}
    obj[id] = {
      id,
      open,
    }
    return obj
  }, {})
}

const getInitialFolderState = (savedFolders, artistId) => {
  const stateKey = getFolderStateKey(artistId)
  const savedState = JSON.parse(getLocalStorage(stateKey))
  if (savedState) return savedState
  // If no saved state, build it here
  const initialState = buildFolderStates(savedFolders)
  locallyStoreFolderStates(initialState, artistId)
  return initialState
}

// * FOLDERS
const tidyFolders = (folders, defaultLinkId) => {
  return folders.map((item) => {
    const { links } = item
    const linksWithDefaultKey = links.map((link) => {
      const { id } = link
      const isDefaultLink = id === defaultLinkId
      return {
        ...link,
        isDefaultLink,
      }
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
  return integrationsFolder.links.map(({ id, tags, platform: platformName }) => {
    const platform = platformName || tags.platform
    return { id, platform }
  })
}

const fetchIntegrations = ({ artist, folders }) => {
  const { integrations } = artist
  // Remove empty integrations
  const filteredArtistIntegrations = integrations.reduce((arr, integration) => {
    if (integration.hidden) return arr
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

// * CONVERSIONS

const canRunConversionCampaigns = (set, get) => () => {
  const { conversionsPreferences } = get()
  const hasConversionsSetUpCorrectly = Object.values(conversionsPreferences).every(Boolean)
  return hasConversionsSetUpCorrectly
}

// * DEFAULT LINK
const getDefaultLink = ({ linkFolders, artist, linkId }) => {
  const { defaultLinkId: id } = getPreferences(artist, 'posts')
  const defaultLinkId = linkId || id
  return linksHelpers.getLinkById(linkFolders, defaultLinkId) || {}
}

// * FETCH LINKS

const formatServerLinks = ({ folders, defaultLinkId, artist }) => {
  // Update links in integration folder
  const integrationLinks = fetchIntegrations({ artist, folders })
  const integrationsFolderIndex = folders.findIndex(({ id }) => id === integrationsFolderId)
  const foldersUpdatedIntegrations = produce(folders, draftFolders => {
    // Replace integration links with formatted integration links
    draftFolders[integrationsFolderIndex].links = integrationLinks
    // Make sure all links have names
    draftFolders.forEach((folder) => folder.links.forEach((link) => {
      link.name = link.name || removeProtocolFromUrl(link.href)
    }))
  })
  // Format links
  // Add add type key to folders, and
  // Add isDefaultLink to default link
  return tidyFolders(foldersUpdatedIntegrations, defaultLinkId)
}

// Fetch data from server and update store (or return cached data)
const fetchData = (set, get) => async (action, artist) => {
  let minConversionsBudget = 0
  let formattedMinConversionsBudget = ''
  const { savedLinks, isControlsLoading, artistId, currency } = get()
  // Stop here if data is already loading
  if (isControlsLoading) return
  set({ isControlsLoading: true })
  // If there already are links and we not force, no need to reset data
  if (savedLinks.length && action !== 'force') return
  // Set data as loading
  set({ isControlsLoading: true })
  // Else fetch links from server
  const { res, error } = await linksHelpers.fetchSavedLinks(artistId)
  // Handle error
  if (error) {
    const linkBankError = { message: `Error fetching links. ${error.message}` }
    set({ linkBankError, isControlsLoading: false })
    return { error }
  }
  const { folders } = res
  // Get minimium conversions budget
  if (Object.keys(artist.feedMinBudgetInfo).length) {
    const { res: { min_recommended_stories_rounded } } = await getMinBudgets(artist.id)

    minConversionsBudget = min_recommended_stories_rounded
    formattedMinConversionsBudget = formatCurrency(minConversionsBudget, currency)
  }
  // Get posts, conversions and optimization preferences
  const posts = getPreferences(artist, 'posts')
  const conversions = getPreferences(artist, 'conversions')
  const optimization = getPreferences(artist, 'optimization')
  // Create array of links in folders for display
  const { defaultLinkId } = posts
  const nestedLinks = formatServerLinks({ folders, defaultLinkId, artist })
  // Get default link
  const defaultLink = getDefaultLink({ artist, linkFolders: nestedLinks, linkId: defaultLinkId })
  // Create an array of folder IDs
  const savedFolders = getSavedFolders(nestedLinks)
  // Get folder states
  const folderStates = getInitialFolderState(savedFolders, artist.id)
  // Cache links and folders
  set({
    savedFolders,
    nestedLinks,
    isControlsLoading: false,
    linkBankError: null,
    folderStates,
    defaultLink,
    postsPreferences: posts,
    conversionsPreferences: conversions,
    optimizationPreferences: optimization,
    minConversionsBudget,
    formattedMinConversionsBudget,
  })
}

// * UPDATE STATE

// UPDATE AFTER INTEGRATION CHANGES
const updateLinksWithIntegrations = (set, get) => (artist) => {
  const { nestedLinks } = get()
  if (!nestedLinks.length) return
  const { defaultLinkId } = getPreferences(artist, 'posts')
  // Get updated nested links
  const nestedLinksUpdated = formatServerLinks({ folders: nestedLinks, defaultLinkId, artist })
  set({ nestedLinks: nestedLinksUpdated })
}

// UPDATE LINKS
const getUpdatedLinks = (set, get) => (action, { newLink, oldLink = {} }) => {
  const { nestedLinks, defaultLink } = get()
  // add link
  if (action === 'add') {
    return linksHelpers.afterAddLink({ newLink, nestedLinks })
  }
  // edit link
  if (action === 'edit') {
    return linksHelpers.afterEditLink({ newLink, oldLink, nestedLinks, defaultLink })
  }
  // delete link
  if (action === 'delete') {
    return linksHelpers.afterDeleteLink({ oldLink, nestedLinks })
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

// UPDATE PREFERENCES
const updatePreferences = (set, get) => (preferences) => {
  const controlsStore = get()

  const newState = produce(controlsStore, draftState => {
    Object.entries(preferences).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        draftState[key][k] = v
      })
    })
  })
  set(newState)
}

const updateSpending = (set, get) => (budget, status) => {
  const { canRunConversionCampaigns } = get()
  set({ budget })
  set({ isSpendingPaused: status })
  set({ canRunConversions: canRunConversionCampaigns() })
}

// UPDATE LINKS
const updateLinks = (set, get) => (action, {
  newArtist,
  newLink,
  oldLink,
  newFolder,
  oldFolder,
}) => {
  // UPDATE DEFAULT LINK
  if (action === 'chooseNewDefaultLink') {
    const { nestedLinks } = get()
    const defaultLink = getDefaultLink({ artist: newArtist, linkFolders: nestedLinks })
    const updatedNestedLinks = tidyFolders(nestedLinks, defaultLink.id)
    set({ defaultLink, nestedLinks: updatedNestedLinks })
    return defaultLink
  }
  // GET UPDATED NESTED LINKS WHEN...
  const { nestedLinksUpdated, defaultLinkUpdated } = newLink
    // ...Updating link
    ? getUpdatedLinks(set, get)(action, { newLink, oldLink })
    // ...Updating folder
    : getUpdatedFolders(set, get)(action, { newFolder, oldFolder })
  // GET UPDATED SAVED FOLDERS
  const savedFolders = getSavedFolders(nestedLinksUpdated)
  // GET UPDATED FOLDER STATES
  const { folderStates, artistId } = get()
  const newFolderStates = buildFolderStates(savedFolders, folderStates)
  // UPDATE STORE
  set({
    nestedLinks: nestedLinksUpdated,
    savedFolders,
    folderStates: newFolderStates,
    // Update default link (if needed)
    ...(defaultLinkUpdated && { defaultLink: defaultLinkUpdated }),
  })
  // UPDATE LOCAL STORAGE
  locallyStoreFolderStates(newFolderStates, artistId)
}


// EXPORT STORE
const useControlsStore = create((set, get) => ({
  // STATE
  artistId: initialState.artistId,
  isMusician: initialState.isMusician,
  defaultLink: initialState.defaultLink,
  postsPreferences: initialState.postsPreferences,
  conversionsPreferences: initialState.conversionsPreferences,
  optimizationPreferences: initialState.optimizationPreferences,
  currency: initialState.currency,
  budget: initialState.budget,
  minConversionsBudget: initialState.minConversionsBudget,
  formattedMinConversionsBudget: initialState.formattedMinConversionsBudget,
  isSpendingPaused: initialState.isSpendingPaused,
  canRunConversions: initialState.canRunConversions,
  conversionsEnabled: initialState.conversionsEnabled,
  savedLinks: initialState.savedLinks,
  savedFolders: initialState.savedFolders,
  nestedLinks: initialState.nestedLinks,
  folderStates: initialState.folderStates,
  isControlsLoading: initialState.isControlsLoading,
  linkBankError: initialState.linkBankError,
  // GETTERS
  fetchData: fetchData(set, get),
  canRunConversionCampaigns: canRunConversionCampaigns(set, get),
  // SETTERS
  updateLinksWithIntegrations: (artist) => updateLinksWithIntegrations(set, get)(artist),
  updateLinks: updateLinks(set, get),
  updateFolderStates: updateFolderStates(set, get),
  updatePreferences: updatePreferences(set, get),
  updateSpending: updateSpending(set, get),
  setConversionsEnabled: (conversionsEnabled) => set({ conversionsEnabled }),
  setLinkBankError: (error) => set({ linkBankError: error }),
  setIsControlsLoading: (isControlsLoading) => set({ isControlsLoading }),
  clearLinks: () => set({ savedLinks: initialState.savedLinks }),
  initControlsStore: async (artist, action = 'clearLinks') => {
    // Set artist details
    set({
      artistId: artist.id,
      currency: artist.currency,
      isControlsLoading: false,
      conversionsEnabled: artist.conversions_enabled,
    })
    // Fetch data
    if (action === 'fetchData') {
      await get().fetchData('force', artist)

      // Set budget and spending status
      const { updateSpending } = get()
      updateSpending(artist.daily_budget, artist.isSpendingPaused)
      return
    }
    // Clear links
    get().clearLinks()
  },
  clearAll: () => set(initialState),
}))

export default useControlsStore
