// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { UserContext } from './User'
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from '../helpers/helper'
import server from '../helpers/server'
import artistHelpers from '../helpers/artistHelpers'
// IMPORT STYLES

const initialArtistState = {}
const ArtistContext = React.createContext(initialArtistState)
ArtistContext.displayName = 'ArtistContext'


const artistReducer = (artistState, artistAction) => {
  const {
    type: actionType,
    payload,
  } = artistAction

  switch (actionType) {
    case 'no-artists': {
      return initialArtistState
    }
    case 'set-artist': {
      return artistAction.payload.artist
    }
    case 'set-budget': {
      return produce(artistState, draftState => {
        draftState.daily_budget = payload.budget
      })
    }
    case 'set-new-url': {
      return produce(artistState, draftState => {
        draftState[payload.urlType] = payload.url
        draftState.URLs[payload.urlType] = payload.url
      })
    }
    case 'set-priority-dsp': {
      return produce(artistState, draftState => {
        draftState.priority_dsp = payload.priority_dsp
      })
    }
    case 'set-integration-errors': {
      return produce(artistState, draftState => {
        draftState.integrationErrors = payload.errors
        draftState.showIntegrationErrors = true
      })
    }
    case 'hide-integration-errors': {
      return produce(artistState, draftState => {
        draftState.showIntegrationErrors = false
      })
    }
    default:
      throw new Error(`Unable to find ${artistAction.type} in artistReducer`)
  }
}

function ArtistProvider({ children }) {
  const { storeUser } = React.useContext(UserContext)

  const [artist, setArtist] = React.useReducer(artistReducer, initialArtistState)
  const [artistLoading, setArtistLoading] = React.useState(true)
  const currentArtistId = React.useRef('')

  const noArtist = React.useCallback(() => {
    setArtistLoading(true)
    localStorage.clear()
    setArtist({ type: 'no-artists' })
    setArtistLoading(false)
  }, [])

  const storeArtist = React.useCallback(async id => {
    // TODO : Store previously selected artists in state,
    //  then if the user switches back to that artist, there doesn't need to be a new server call

    setArtistLoading(true)
    // Get artist information from server
    try {
      const artist = await artistHelpers.getArtist(id)
      setArtist({
        type: 'set-artist',
        payload: {
          artist,
        },
      })
      setArtistLoading(false)
      currentArtistId.current = id
      return artist
    } catch (err) {
      setArtistLoading(false)
      throw (err)
    }
  })

  const createArtist = async (artistAccounts, accessToken) => {
    setArtistLoading(true)
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
        priority_dsp: priority_dsp || helper.selectPriorityDSP(artist),
      }

      await artistHelpers.createArtist(artistWithDsp, accessToken)
    })
    // Wait to connect all artists
    await Promise.all(createAllArtists)
      .catch((err) => {
        throw (err)
      })
    // Update user
    const updatedUser = await storeUser()
    const selectedArtist = updatedUser.artists[0]
    await storeArtist(selectedArtist.id)
    setArtistLoading(false)
  }

  const updateBudget = async (id, currency, amount) => {
    const updatedArtist = await server.updateDailyBudget(id, amount)

    setArtist({
      type: 'set-budget',
      payload: {
        budget: updatedArtist.daily_budget,
      },
    })
    return updatedArtist.daily_budget
  }

  const setPriorityDSP = React.useCallback(priorityDSP => {
    setArtist({
      type: 'set-priority-dsp',
      payload: {
        priority_dsp: priorityDSP,
      },
    })
  }, [])

  const addUrl = async (url, urlType) => {
    const updatedArtist = await server.saveLink(artist.id, url, urlType)

    const savedUrl = updatedArtist[urlType]
    setArtist({
      type: 'set-new-url',
      payload: {
        urlType,
        url: savedUrl,
      },
    })
    return savedUrl
  }

  // INTEGRATION ERRORS
  // --------------------
  const setIntegrationErrors = (errors) => {
    console.log('errors', errors)
    setArtist({
      type: 'set-integration-errors',
      payload: {
        errors,
      },
    })
  }

  const getIntegrationErrors = async () => {
    const errors = await server.getIntegrationErrors(currentArtistId.current)
      .catch((err) => {
        throw (err)
      })
    setIntegrationErrors(errors)
  }

  const hideIntegrationErrors = () => {
    setArtist({ type: 'hide-integration-errors' })
  }

  // Store artist id in local storage
  React.useEffect(() => {
    if (!artist.id) return
    localStorage.setItem('artistId', artist.id)
    currentArtistId.current = artist.id
    getIntegrationErrors()
  }, [artist.id])

  const value = {
    addUrl,
    artist,
    artistLoading,
    createArtist,
    noArtist,
    setArtist,
    setArtistLoading,
    setPriorityDSP,
    storeArtist,
    updateBudget,
    getIntegrationErrors,
    hideIntegrationErrors,
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
