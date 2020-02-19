// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './Auth'
import { UserContext } from './User'
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from '../helpers/helper'
import server from '../helpers/server'
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

function ArtistProvider(props) {
  const { getToken } = React.useContext(AuthContext)

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
      const token = await getToken()
      const artist = await server.getArtist(id, token)
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
  }, [getToken])

  const createArtist = async (artistAccounts, accessToken) => {
    setArtistLoading(true)
    const artistIds = Object.keys(artistAccounts)
    artistIds.forEach((artistId) => {
      const artistAccount = artistAccounts[artistId]
      const { connect, country_code } = artistAccount
      if (connect && !country_code) {
        throw new Error(`Please select a country for ${artistAccount.name}, or deselect that page from being added to your Feed account`)
      }
    })

    const token = await getToken()
    const createArtistPromises = artistIds.reduce(async (acc, artistId) => {
      const artistAccount = artistAccounts[artistId]
      const { connect, priority_dsp } = artistAccount
      if (connect) {
        if (!priority_dsp) {
          artistAccount.priority_dsp = helper.selectPriorityDSP(artistAccount)
        }
        return [...acc, await server.createArtist(artistAccount, accessToken, token)]
      }
      return acc
    }, [])
    // Wait to connect all artists
    await Promise.all(createArtistPromises)
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
    const token = await getToken()
    const updatedArtist = await server.updateDailyBudget(id, amount, token)
      .catch((err) => {
        throw (err)
      })

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
    const token = await getToken()
    const updatedArtist = await server.saveLink(artist.id, url, urlType, token)
      .catch((err) => {
        throw (err)
      })

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
      {props.children}
    </ArtistContext.Provider>
  )
}

export default ArtistContext

const ArtistConsumer = ArtistContext.Consumer

export { ArtistContext, ArtistProvider, ArtistConsumer }
