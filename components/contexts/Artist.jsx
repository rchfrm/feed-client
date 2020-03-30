// IMPORT PACKAGES
import React from 'react'
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
  switch (artistAction.type) {
    case 'no-artists': {
      return initialArtistState
    }
    case 'set-artist': {
      return artistAction.payload.artist
    }
    case 'set-budget': {
      return {
        ...artistState,
        daily_budget: artistAction.payload.budget,
      }
    }
    case 'set-new-url': {
      return {
        ...artistState,
        [artistAction.payload.urlType]: artistAction.payload.url,
        URLs: {
          ...artistState.URLs,
          [artistAction.payload.urlType]: artistAction.payload.url,
        },
      }
    }
    case 'set-priority-dsp': {
      return {
        ...artistState,
        priority_dsp: artistAction.payload.priority_dsp,
      }
    }
    default:
      throw new Error(`Unable to find ${artistAction.type} in artistReducer`)
  }
}

function ArtistProvider({ children }) {
  const { storeUser } = React.useContext(UserContext)

  const [artist, setArtist] = React.useReducer(artistReducer, initialArtistState)
  const [artistLoading, setArtistLoading] = React.useState(true)

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
      return artist
    } catch (err) {
      setArtistLoading(false)
      throw (err)
    }
  }, [])

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

  // Store artist id in local storage
  React.useEffect(() => {
    if (artist.id) {
      localStorage.setItem('artistId', artist.id)
    }
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
