import React from 'react'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/app/contexts/InterfaceContext'
import useControlsStore from '@/app/stores/controlsStore'
import * as utils from '@/helpers/utils'
import { track } from '@/helpers/trackingHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import { calcFeedMinBudgetInfo } from '@/app/helpers/budgetHelpers'
import { formatAndFilterIntegrations } from '@/helpers/integrationHelpers'
import { trackGoogleProfileCreated } from 'shared/helpers/trackGoogleHelpers'
import useBillingStore from '@/app/stores/billingStore'

const updateIsControlsLoading = (state) => state.setIsControlsLoading

const getBillingStoreState = (state) => ({
  addOrganizationArtist: state.addOrganizationArtist,
})

const initialArtistState = {
  id: '',
  picture: '',
  URLs: {},
  preferences: {
    posts: {
      promotion_enabled_default_per_type: {},
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
  hasSetUpProfile: false,
  hasGrowthPlan: false,
  hasProPlan: false,
  hasLegacyPlan: false,
  hasNoPlan: false,
  hasCancelledPlan: false,
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
    case 'set-plan': {
      draftState.plan = payload.artist.plan
      draftState.hasFreePlan = artistHelpers.hasPlan(payload.artist, 'free')
      draftState.hasBasicPlan = artistHelpers.hasPlan(payload.artist, 'basic')
      draftState.hasGrowthPlan = artistHelpers.hasPlan(payload.artist, 'growth')
      draftState.hasProPlan = artistHelpers.hasPlan(payload.artist, 'pro')
      draftState.hasNoPlan = ! payload.artist.plan
      draftState.hasCancelledPlan = draftState.status !== 'active' && ! draftState.hasNoPlan
      break
    }
    case 'set-status': {
      draftState.status = payload.status
      draftState.hasCancelledPlan = draftState.status !== 'active' && ! draftState.hasNoPlan
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
    case 'update-facebook-integration-scopes': {
      const facebookIntegration = draftState.integrations.find((integration) => integration.platform === 'facebook')
      if (! facebookIntegration.authorization) {
        facebookIntegration.authorization = {}
      }
      facebookIntegration.authorization.scopes = payload.scopes
      break
    }
    case 'set-has-set-up-profile': {
      draftState.hasSetUpProfile = payload.hasSetUpProfile
      break
    }
    case 'update-tiktok-integration-account-id': {
      // TODO: Once we've build the functionality to ask the user which advertiser to use, store the real account id
      draftState.integrations.find((integration) => integration.platform === 'tiktok').accountId = 'tikTokAccountId'
      break
    }
    default:
      throw new Error(`Unable to find ${action.type} in artistReducer`)
  }
}

function ArtistProvider({ children }) {
  const { storeUser } = React.useContext(UserContext)
  const setIsControlsLoading = useControlsStore(updateIsControlsLoading)
  const { addOrganizationArtist } = useBillingStore(getBillingStoreState)
  // Import interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [artist, setArtist] = useImmerReducer(artistReducer, initialArtistState)
  const [artistId, setArtistId] = React.useState('')
  const [artistCurrency, setArtistCurrency] = React.useState('')
  const [artistLoading, setArtistLoading] = React.useState(true)
  const [hasBudget, setHasBudget] = React.useState(false)
  const [enabledPosts, setEnabledPosts] = React.useState([])

  const setNoArtist = () => {
    setArtistLoading(true)
    toggleGlobalLoading(true)
    utils.setLocalStorage('artistId', '')
    setArtist({ type: 'no-artists' })
    setArtistLoading(false)
    toggleGlobalLoading(false)
  }

  const updateArtist = React.useCallback(async (artist) => {
    // Test whether artist is musician
    const { category_list: artistCategories, preferences } = artist
    const isMusician = artistHelpers.testIfMusician(artistCategories)

    // Test whether default link is set
    const missingDefaultLink = ! artistHelpers.getDefaultLinkId(artist)

    // Format integrations
    const integrationsFormatted = formatAndFilterIntegrations(artist.integrations, isMusician)

    // Test if spotify is connected
    const spotifyConnected = artistHelpers.testIfSpotifyConnected(integrationsFormatted)

    // Get formatted min budget info
    const feedMinBudgetInfo = calcFeedMinBudgetInfo(artist)

    // Get spending paused status
    const isSpendingPaused = preferences?.targeting?.status === 0

    // Get completed setup at
    const hasSetUpProfile = Boolean(artist.completed_setup_at)

    // Set pricing plan booleans
    const hasFreePlan = artistHelpers.hasPlan(artist, 'free')
    const hasBasicPlan = artistHelpers.hasPlan(artist, 'basic')
    const hasGrowthPlan = artistHelpers.hasPlan(artist, 'growth')
    const hasProPlan = artistHelpers.hasPlan(artist, 'pro')
    const hasLegacyPlan = artistHelpers.hasPlan(artist, 'legacy')
    const hasNoPlan = ! artist?.plan
    const hasCancelledPlan = artist.status !== 'active'

    // Update artist with new info
    const artistUpdated = produce(artist, (artistDraft) => {
      artistDraft.isMusician = isMusician
      artistDraft.spotifyConnected = spotifyConnected
      artistDraft.missingDefaultLink = missingDefaultLink
      artistDraft.integrations = integrationsFormatted
      artistDraft.feedMinBudgetInfo = feedMinBudgetInfo || {}
      artistDraft.isSpendingPaused = isSpendingPaused
      artistDraft.hasSetUpProfile = hasSetUpProfile
      artistDraft.hasFreePlan = hasFreePlan
      artistDraft.hasBasicPlan = hasBasicPlan
      artistDraft.hasGrowthPlan = hasGrowthPlan
      artistDraft.hasProPlan = hasProPlan
      artistDraft.hasLegacyPlan = hasLegacyPlan
      artistDraft.hasNoPlan = hasNoPlan
      artistDraft.hasCancelledPlan = hasCancelledPlan
    })

    // Set hasBudget state
    setHasBudget(!! artist.daily_budget)

    setArtist({
      type: 'set-artist',
      payload: {
        artist: artistUpdated,
      },
    })

    setArtistLoading(false)
  }, [setArtist])

  const storeArtist = React.useCallback(async (id, hasSwitchedBetweenArtists = true) => {
    setArtistLoading(true)
    if (hasSwitchedBetweenArtists) {
      setIsControlsLoading(true)
    }
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

    if (! artist) return

    await updateArtist(artist)

    return { artist }
  }, [toggleGlobalLoading, updateArtist, setIsControlsLoading])

  /**
   * @param {array} artistAccount
   * @param {object} oldUser
   * @returns {Promise<any>}
  */
  const connectArtist = React.useCallback(async (artistAccount, oldUser, plan) => {
    // Get array of current user artist Facebook page IDs
    const alreadyConnectFacebookPages = oldUser.artists.map(({ facebook_page_id }) => facebook_page_id)

    // * STOP HERE if the artist account has already been connected
    if (alreadyConnectFacebookPages.includes(artistAccount.page_id)) {
      setArtistLoading(false)
      return { error: { message: 'Artist account has already been connected' } }
    }

    // Wait to connect the artist
    const artist = await artistHelpers.createArtist(artistAccount, plan)
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
    const selectedArtist = updatedUser.artists.find((artist) => artist.facebook_page_id === artistAccount.page_id)
    const hasSwitchedBetweenArtists = oldUser?.artists[0]?.id !== selectedArtist.id

    await storeArtist(selectedArtist.id, hasSwitchedBetweenArtists)
    addOrganizationArtist(artist)
    setArtistLoading(false)

    // TRACK
    const newUser = ! oldUser.artists.length

    if (newUser) {
      track('create_profile')
      trackGoogleProfileCreated()
    } else {
      track('add_profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        isSpendingPaused: ! spendingStatus,
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

  const setPlan = React.useCallback((artist) => {
    setArtist({
      type: 'set-plan',
      payload: {
        artist,
      },
    })
  }, [setArtist])

  const setStatus = React.useCallback((status) => {
    setArtist({
      type: 'set-status',
      payload: {
        status,
      },
    })
  }, [setArtist])

  const setPostPreferences = (preferenceType, value) => {
    setArtist({
      type: 'update-post-preferences',
      payload: {
        preferenceType,
        value,
      },
    })
  }

  const updateHasSetUpProfile = (completedSetupAt) => {
    setArtist({
      type: 'set-has-set-up-profile',
      payload: {
        hasSetUpProfile: Boolean(completedSetupAt),
      },
    })
  }

  // Update artist ID
  React.useEffect(() => {
    if (! artist || ! artist.id) return
    const { id, currency } = artist
    // Set artist
    setArtistId(id)
    // Set currency
    setArtistCurrency(currency)
  }, [artist])

  // WHEN ARTIST CHANGES...
  // ----------------------
  React.useEffect(() => {
    if (! artistId) return
    // Store artist id in local storage
    utils.setLocalStorage('artistId', artistId)
  // eslint-disable-next-line
  }, [artistId, setArtist])

  const value = {
    artist,
    artistId,
    artistCurrency,
    artistLoading,
    enabledPosts,
    connectArtist,
    setNoArtist,
    setArtist,
    setArtistLoading,
    setConnection,
    setPlan,
    setStatus,
    setPostPreferences,
    setEnabledPosts,
    storeArtist,
    updateBudget,
    updateArtist,
    updateSpendingPaused,
    updateHasSetUpProfile,
    hasBudget,
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
