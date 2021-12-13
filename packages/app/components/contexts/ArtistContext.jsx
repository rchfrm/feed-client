// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'
// IMPORT CONTEXTS
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT STORES
import useControlsStore from '@/app/stores/controlsStore'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import { track } from '@/helpers/trackingHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import { calcFeedMinBudgetInfo } from '@/app/helpers/budgetHelpers'
import { formatAndFilterIntegrations } from '@/helpers/integrationHelpers'
import { trackGoogleProfileCreated } from 'shared/helpers/trackGoogleHelpers'

const updateIsControlsLoading = state => state.setIsControlsLoading

const initialArtistState = {
  id: '',
  picture: '',
  URLs: {},
  preferences: {
    posts: {
      promotion_enabled_default: true,
      default_link_id: null,
    },
  },
  integrations: {},
  currency: '',
  users: {},
  min_daily_budget_info: {},
  feedMinBudgetInfo: {}, // { minRaw, minRounded, minString }
  isSpendingPaused: false,
  missingDefaultLink: true,
  isMusician: false,
  featureFlags: {},
}

const ArtistContext = React.createContext(initialArtistState)
ArtistContext.displayName = 'ArtistContext'

const artistReducer = (draftState, action) => {
  const {
    type: actionType,
    payload,
  } = action

  switch (actionType) {
    case 'no-artists': {
      return initialArtistState
    }
    case 'set-artist': {
      return payload.artist
    }
    case 'set-budget': {
      draftState.daily_budget = payload.budget
      break
    }
    case 'set-spending-paused': {
      draftState.isSpendingPaused = payload.isSpendingPaused
      break
    }
    case 'set-min-budget': {
      draftState.feedMinBudgetInfo = payload.feedMinBudgetInfo
      break
    }
    case 'set-connection': {
      draftState.URLs[payload.platform] = payload.url
      draftState[payload.platform] = payload.url
      break
    }
    case 'update-post-preferences': {
      draftState.preferences.posts[payload.preferenceType] = payload.value
      if (payload.preferenceType === 'default_link_id') {
        draftState.missingDefaultLink = false
      }
      break
    }
    case 'update-integrations': {
      // Format integrations
      const integrationsFormatted = formatAndFilterIntegrations(payload.integrations, draftState.isMusician)
      // Test if spotify is connected
      const spotifyConnected = artistHelpers.testIfSpotifyConnected(integrationsFormatted)
      // Update artist
      draftState.integrations = integrationsFormatted
      draftState.spotifyConnected = spotifyConnected
      break
    }
    default:
      throw new Error(`Unable to find ${action.type} in artistReducer`)
  }
}

function ArtistProvider({ children }) {
  const { storeUser } = React.useContext(UserContext)
  const setIsControlsLoading = useControlsStore(updateIsControlsLoading)
  // Import interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [artist, setArtist] = useImmerReducer(artistReducer, initialArtistState)
  const [artistId, setArtistId] = React.useState('')
  const [artistCurrency, setArtistCurrency] = React.useState('')
  const [artistLoading, setArtistLoading] = React.useState(true)
  const [hasBudget, setHasBudget] = React.useState(false)
  const [featureFlags, setFeatureFlags] = React.useState({})

  const setNoArtist = () => {
    setArtistLoading(true)
    toggleGlobalLoading(true)
    utils.setLocalStorage('artistId', '')
    setArtist({ type: 'no-artists' })
    setArtistLoading(false)
    toggleGlobalLoading(false)
  }

  const updateArtist = React.useCallback((artist) => {
    // Test whether artist is musician
    const { category_list: artistCategories, preferences } = artist
    const isMusician = artistHelpers.testIfMusician(artistCategories)

    // Test whether default link is set
    const missingDefaultLink = !artistHelpers.getDefaultLinkId(artist)

    // Format integrations
    const integrationsFormatted = formatAndFilterIntegrations(artist.integrations, isMusician)

    // Test if spotify is connected
    const spotifyConnected = artistHelpers.testIfSpotifyConnected(integrationsFormatted)

    // Get formatted min budget info
    const feedMinBudgetInfo = calcFeedMinBudgetInfo(artist)

    // Get spending paused status
    const isSpendingPaused = preferences?.targeting?.status === 0

    // Update artist with new info
    const artistUpdated = produce(artist, artistDraft => {
      artistDraft.isMusician = isMusician
      artistDraft.spotifyConnected = spotifyConnected
      artistDraft.missingDefaultLink = missingDefaultLink
      artistDraft.integrations = integrationsFormatted
      artistDraft.feedMinBudgetInfo = feedMinBudgetInfo || {}
      artistDraft.isSpendingPaused = isSpendingPaused
    })

    // Set hasBudget state
    setHasBudget(!!artist.daily_budget)

    setArtist({
      type: 'set-artist',
      payload: {
        artist: artistUpdated,
      },
    })
  }, [setArtist])

  const storeArtist = React.useCallback(async (id) => {
    // TODO : Store previously selected artists in state,
    //  then if the user switches back to that artist, there doesn't need to be a new server call
    setArtistLoading(true)
    setIsControlsLoading(true)
    toggleGlobalLoading(true)
    // Get artist information from server
    const { artist, error } = await artistHelpers.getArtist(id)
    if (error) {
      setArtistLoading(false)
      // Sentry error
      fireSentryError({
        category: 'sign up',
        action: 'Could not get artist using artistHelpers.getArtist(id)',
        description: error.message,
        label: `artistId: ${id}`,
      })
      return {
        error: { message: `Error fetching artist ID: ${id}` },
      }
    }

    if (!artist) return

    updateArtist(artist)
    setArtistLoading(false)
    return { artist }
  }, [toggleGlobalLoading, setIsControlsLoading, updateArtist])

  /**
   * @param {array} artistAccounts
   * @param {string} accessToken
   * @param {object} oldUser
   * @returns {Promise<any>}
  */
  const connectArtists = React.useCallback(async (artistAccounts, accessToken, oldUser) => {
    // Get array of current user artist Facebook page IDs
    const alreadyConnectFacebookPages = oldUser.artists.map(({ facebook_page_id }) => facebook_page_id)
    // Filter out non-connected artist accounts
    const unconnectedArtistAccounts = artistAccounts.filter(({ page_id: facebookPageId }) => {
      return !alreadyConnectFacebookPages.includes(facebookPageId)
    })
    // * STOP HERE if there are no new artist accounts
    if (!unconnectedArtistAccounts.length) {
      setArtistLoading(false)
      return {}
    }
    // Create all artists
    const createAllArtists = unconnectedArtistAccounts.map(async (artist) => {
      return artistHelpers.createArtist(artist, accessToken)
    })
    // Wait to connect all artists
    await Promise.all(createAllArtists)
      .catch((error) => {
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'Problem creating artists in Artist context createArtist()',
          description: error.message,
        })
        setArtistLoading(false)
        throw (error)
      })
    // Update user
    const { user: updatedUser, error } = await storeUser()
    if (error) {
      setArtistLoading(false)
      // Sentry error
      fireSentryError({
        category: 'sign up',
        action: 'Problem updating user in Artist context createArtist()',
        description: error.message,
      })
      return
    }
    const selectedArtist = updatedUser.artists[0]
    await storeArtist(selectedArtist.id)
    setArtistLoading(false)
    // TRACK
    const newUser = !oldUser.artists.length
    if (newUser) {
      track('create_profile')
      trackGoogleProfileCreated()
    } else {
      track('add_profile')
    }
  }, [storeArtist, storeUser])

  const updateBudget = React.useCallback((majorUnitAmount) => {
    setArtist({
      type: 'set-budget',
      payload: {
        budget: majorUnitAmount,
      },
    })
  }, [setArtist])

  const updateSpendingPaused = React.useCallback((spendingStatus) => {
    setArtist({
      type: 'set-spending-paused',
      payload: {
        isSpendingPaused: !spendingStatus,
      },
    })
  }, [setArtist])

  const setConnection = ({ platform, url }) => {
    setArtist({
      type: 'set-connection',
      payload: {
        platform,
        url,
      },
    })
  }

  const setPostPreferences = (preferenceType, value) => {
    setArtist({
      type: 'update-post-preferences',
      payload: {
        preferenceType,
        value,
      },
    })
  }

  // Update artist ID
  React.useEffect(() => {
    if (!artist || !artist.id) return
    const { id, currency, feature_flags: { conversions_enabled } } = artist
    // Set artist
    setArtistId(id)
    // Set currency
    setArtistCurrency(currency)
    // Set feature flags value
    setFeatureFlags({
      conversionsEnabled: conversions_enabled,
    })
  }, [artist])

  // WHEN ARTIST CHANGES...
  // ----------------------
  React.useEffect(() => {
    if (!artistId) return
    // Store artist id in local storage
    utils.setLocalStorage('artistId', artistId)
  // eslint-disable-next-line
  }, [artistId, setArtist])

  const value = {
    artist,
    artistId,
    artistCurrency,
    artistLoading,
    connectArtists,
    setNoArtist,
    setArtist,
    setArtistLoading,
    setConnection,
    setPostPreferences,
    storeArtist,
    updateBudget,
    updateArtist,
    updateSpendingPaused,
    hasBudget,
    featureFlags,
  }

  return (
    <ArtistContext.Provider value={value}>
      {children}
    </ArtistContext.Provider>
  )
}

export default ArtistContext

const ArtistConsumer = ArtistContext.Consumer

export { ArtistContext, ArtistProvider, ArtistConsumer }
