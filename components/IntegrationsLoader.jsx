// IMPORT PACKAGES
import React from 'react'
import { useImmerReducer } from 'use-immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Loading from './elements/Loading'
// IMPORT PAGES
import Connections from './Connections'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
import artistHelpers from './helpers/artistHelpers'
// IMPORT STYLES

const initialConnectionsState = {}

const connectionsReducer = (draftState, action) => {
  const { type: actionType, payload } = action
  switch (actionType) {
    case 'set-all':
      return payload
    case 'set-platform':
      draftState[payload.platform].platform = payload.platform
      draftState[payload.platform].name = payload.name
      draftState[payload.platform].url = payload.url
      draftState[payload.platform].valid = !!payload.url
      break
    case 'toggle-platform-validity':
      // Either set validity explicity or switch boolean
      draftState[payload.platform].valid = typeof payload.state === 'boolean'
        ? payload.state
        : !draftState[payload.platform].valid
      break
    case 'update-priority-dsp':
      draftState[payload.platform].priority = payload.priority
      break
    default:
      throw new Error(`Could not find ${actionType} in integrationDetailsReducer`)
  }
}

function IntegrationsLoader({
  artistId,
  artistName,
  setErrors,
}) {
  // DEFINE STATE
  const [artistLoading, setArtistLoading] = React.useState(true)
  const [gettingArtist, setGettingArtist] = React.useState(false)
  const [priorityDSP, setPriorityDSP] = React.useState(undefined)
  const [connections, setConnections] = useImmerReducer(connectionsReducer, initialConnectionsState)
  const [connectionPlatforms, setConnectionPlatforms] = React.useState([])
  // END DEFINE STATE

  // DEFINE FUNCTION TO RETRIEVE ARTIST INFORMATION
  const getArtist = React.useCallback(async () => {
    // Request artist information from the server
    const artist = await artistHelpers.getArtist(artistId)
      .catch((error) => {
        console.error(error)
        setErrors([error])
      })
    // Handle no artist
    if (!artist) return {}
    // Get priority DSP
    const { priority_dsp } = artist
    // Format artist integrations into an object
    const urlNames = Object.keys(artist.URLs)
    const integrations = urlNames.reduce((obj, name, index) => {
      const platform = helper.extractPlatformFromPriorityDSP(name)
      const url = artist[name]
      return {
        ...obj,
        [platform]: {
          platform,
          name,
          url,
          valid: !!url,
          index,
        },
      }
    }, {})
    return { integrations, priority_dsp }
  }, [artistId])

  // Create array of connection platforms, sorted
  const getConnectionPlatforms = (integrations) => {
    return Object.values(integrations).reduce((arr, { platform, index }) => {
      arr[index] = platform
      return arr
    }, [])
  }

  // GET CONNECTION DETAILS
  React.useEffect(() => {
    // Exit if a call to get the artist has already been made
    if (gettingArtist) {
      return
    }

    // Exit if the artist has finished loading
    if (!artistLoading) {
      return
    }

    // Call getArtist
    setGettingArtist(true)
    getArtist()
      .then(({ integrations, priority_dsp }) => {
        // Set priority DSP
        setPriorityDSP(priority_dsp)
        // Set connection platforms
        const platforms = getConnectionPlatforms(integrations)
        setConnectionPlatforms(platforms)
        // Set connections
        setConnections({
          type: 'set-all',
          payload: integrations,
        })
        setArtistLoading(false)
      })
  }, [artistLoading, getArtist, gettingArtist])
  // END GET CONNECTION DETAILS

  if (artistLoading) {
    return <Loading what={artistName} noPadding />
  }
  return (
    <Connections
      artistId={artistId}
      connections={connections}
      connectionPlatforms={connectionPlatforms}
      priorityDSP={priorityDSP}
      setConnections={setConnections}
      setPriorityDSP={setPriorityDSP}
    />
  )
}

export default IntegrationsLoader
