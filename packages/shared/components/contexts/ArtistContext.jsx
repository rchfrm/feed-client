// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import { track } from '@/app/helpers/trackingHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'

const initialArtistState = {
  id: '',
  picture: '',
  URLs: {},
  preferences: {
    posts: {
      promotion_enabled_default: true,
    },
  },
  priority_dsp: '',
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
    case 'set-new-url': {
      draftState[payload.urlType] = payload.url
      draftState.URLs[payload.urlType] = payload.url
      break
    }
    case 'set-priority-dsp': {
      draftState.priority_dsp = payload.priority_dsp
      break
    }
    case 'set-connection': {
      draftState.URLs[payload.platform] = payload.url
      draftState[payload.platform] = payload.url
      break
    }
    case 'update-post-preferences': {
      draftState.preferences.posts[payload.preferenceType] = payload.value
      break
    }
    case 'update-integrations': {
      draftState.integrations = payload.integrations
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

    // Get musician and spotify connection status
    const { category_list: artistCategories } = artist
    const isMusician = artistHelpers.testIfMusician(artistCategories)
    const spotifyConnected = artistHelpers.testIfSpotifyConnected(artist.spotify_url)

    // Test whether default link is set
    const missingDefaultLink = !artistHelpers.getDefaultLinkId(artist)

    // Update artist with new info
    const artistUpdated = produce(artist, artistDraft => {
      artistDraft.isMusician = isMusician
      artistDraft.spotifyConnected = spotifyConnected
      artistDraft.missingDefaultLink = missingDefaultLink
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

  const createArtist = async (artistAccounts, accessToken, oldUser) => {
    setArtistLoading(true)
    toggleGlobalLoading(true)
    // Conect artist accounts to array
    const artistAccountsArray = Object.values(artistAccounts)
    // Filter out non-connected artist accounts
    const connectedArtistAccounts = artistAccountsArray.filter(({ connect }) => connect)
    // Check that every account has a country set
    connectedArtistAccounts.forEach(({ country_code, name }) => {
      if (!country_code) {
        throw new Error(`Please select a country for ${name}, or deselect that page from being added to your Feed account`)
      }
    })
    // Create all artists
    const createAllArtists = connectedArtistAccounts.map(async (artist) => {
      const { priority_dsp } = artist
      const artistWithDsp = {
        ...artist,
        priority_dsp: priority_dsp || utils.selectPriorityDSP(artist),
      }

      await artistHelpers.createArtist(artistWithDsp, accessToken)
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
    // Track
    track({
      category: 'sign up',
      action: 'User connected Facebook Pages',
      description: `Pages connected: ${connectedArtistAccounts.length}`,
      label: `User ID: ${updatedUser.id}`,
    })
    // Track first time connecting accounits
    if (!oldUser.artists.length) {
      track({
        category: 'sign up',
        action: 'User completed sign up',
        description: `Pages connected: ${connectedArtistAccounts.length}`,
        label: `User ID: ${updatedUser.id}`,
      })
    }
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

  const setPriorityDSP = (priorityDSP) => {
    setArtist({
      type: 'set-priority-dsp',
      payload: {
        priority_dsp: priorityDSP,
      },
    })
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

  const addArtistUrl = React.useCallback(async (url, urlType) => {
    const updatedArtist = await server.saveLink(artistId, url, urlType)

    const savedUrl = updatedArtist[urlType]
    setArtist({
      type: 'set-new-url',
      payload: {
        urlType,
        url: savedUrl,
      },
    })
    return savedUrl
  }, [artistId, setArtist])

  // Update artist ID when artist changes
  React.useEffect(() => {
    if (!artist || !artist.id) return
    const { id, currency } = artist
    // Set artist
    setArtistId(id)
    // Set currency
    setArtistCurrency(currency)
  }, [artist])

  // Store artist id in local storage
  React.useEffect(() => {
    if (!artistId) return
    // Update local storage
    utils.setLocalStorage('artistId', artistId)
  }, [artistId])

  const value = {
    artist,
    artistId,
    artistCurrency,
    artistLoading,
    createArtist,
    setNoArtist,
    setArtist,
    setArtistLoading,
    setPriorityDSP,
    setConnection,
    setPostPreferences,
    addArtistUrl,
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
