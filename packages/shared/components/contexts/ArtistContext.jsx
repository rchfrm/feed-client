// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import { track } from '@/app/helpers/trackingHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import { formatAndFilterIntegrations } from '@/app/helpers/integrationHelpers'

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
  missingDefaultLink: true,
  isMusician: false,
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

function ArtistProvider({ children, disable }) {
  const { storeUser } = React.useContext(UserContext)
  // Import interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const [artist, setArtist] = useImmerReducer(artistReducer, initialArtistState)
  const [artistId, setArtistId] = React.useState('')
  const [artistCurrency, setArtistCurrency] = React.useState('')
  const [artistLoading, setArtistLoading] = React.useState(true)
  const [hasBudget, setHasBudget] = React.useState(false)

  const setNoArtist = () => {
    if (disable) return
    setArtistLoading(true)
    toggleGlobalLoading(true)
    utils.clearLocalStorage()
    setArtist({ type: 'no-artists' })
    setArtistLoading(false)
    toggleGlobalLoading(false)
  }

  const storeArtist = async (id) => {
    // Stop here if not using
    if (disable) return {}
    // TODO : Store previously selected artists in state,
    //  then if the user switches back to that artist, there doesn't need to be a new server call
    setArtistLoading(true)
    toggleGlobalLoading(true)
    // Get artist information from server
    const { artist, error } = await artistHelpers.getArtist(id)
    if (error) {
      setArtistLoading(false)
      // Track
      track({
        category: 'sign up',
        action: 'Could not get artist using artistHelpers.getArtist(id)',
        description: error.message,
        label: `artistId: ${id}`,
        error: true,
      })
      return { error: {
        message: `Error fetching artist ID: ${id}`,
      } }
    }

    if (!artist) return

    // Test whether artist is musician
    const { category_list: artistCategories } = artist
    const isMusician = artistHelpers.testIfMusician(artistCategories)

    // Test whether default link is set
    const missingDefaultLink = !artistHelpers.getDefaultLinkId(artist)

    // Format integrations
    const integrationsFormatted = formatAndFilterIntegrations(artist.integrations, isMusician)

    // Test if spotify is connected
    const spotifyConnected = artistHelpers.testIfSpotifyConnected(integrationsFormatted)

    // Update artist with new info
    const artistUpdated = produce(artist, artistDraft => {
      artistDraft.isMusician = isMusician
      artistDraft.spotifyConnected = spotifyConnected
      artistDraft.missingDefaultLink = missingDefaultLink
      artistDraft.integrations = integrationsFormatted
    })

    // Set hasBudget state
    setHasBudget(!!artist.daily_budget)

    setArtist({
      type: 'set-artist',
      payload: {
        artist: artistUpdated,
      },
    })
    setArtistLoading(false)
    return { artist }
  }

  const connectArtists = async (artistAccounts, accessToken, oldUser) => {
    setArtistLoading(true)
    toggleGlobalLoading(true)
    // Get array of current user artist Facebook page IDs
    const alreadyConnectFacebookPages = oldUser.artists.map(({ facebook_page_id }) => facebook_page_id)
    // Convert artist accounts to array
    const artistAccountsArray = Object.values(artistAccounts)
    // Filter out non-connected artist accounts
    const newArtistAccounts = artistAccountsArray.filter(({ page_id: facebookPageId }) => {
      return !alreadyConnectFacebookPages.includes(facebookPageId)
    })
    // * STOP HERE if there are no new artist accounts
    if (!newArtistAccounts.length) {
      setArtistLoading(false)
      return
    }
    // Check that every account has a country set
    newArtistAccounts.forEach(({ country_code, name }) => {
      if (!country_code) {
        throw new Error(`Please select a country for ${name}, or deselect that page from being added to your Feed account`)
      }
    })
    // Create all artists
    const createAllArtists = newArtistAccounts.map(async (artist) => {
      return artistHelpers.createArtist(artist, accessToken)
    })
    // Wait to connect all artists
    await Promise.all(createAllArtists)
      .catch((error) => {
        // Track
        track({
          category: 'sign up',
          action: 'Problem creating artists in Artist context createArtist()',
          description: error.message,
          error: true,
        })
        throw (error)
      })
    // Update user
    const updatedUser = await storeUser()
      .catch((error) => {
        // Track
        track({
          category: 'sign up',
          action: 'Problem updating user in Artist context createArtist()',
          description: error.message,
          error: true,
        })
        throw (error)
      })
    // Stop here if no user returned
    if (!updatedUser) {
      setArtistLoading(false)
      return
    }
    const selectedArtist = updatedUser.artists[0]
    await storeArtist(selectedArtist.id)
    setArtistLoading(false)
    // TRACK
    const newUser = !oldUser.artists.length
    track({
      action: newUser ? 'create_profile' : 'add_profile',
      category: newUser ? 'sign_up' : 'account',
      label: updatedUser.id,
    })
  }

  const updateBudget = async (id, amount) => {
    const updatedArtist = await server.updateDailyBudget(id, amount)

    setArtist({
      type: 'set-budget',
      payload: {
        budget: updatedArtist.daily_budget,
      },
    })
    return updatedArtist.daily_budget
  }

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

  // Update artist ID when artist changes
  React.useEffect(() => {
    if (!artist || !artist.id) return
    const { id, currency } = artist
    // Set artist
    setArtistId(id)
    // Set currency
    setArtistCurrency(currency)
  }, [artist])

  // WHEN ARTIST CHANGES...
  // ----------------------

  React.useEffect(() => {
    if (!artistId) return
    // Store artist id in local storage
    utils.setLocalStorage('artistId', artistId)
  }, [artistId])

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
