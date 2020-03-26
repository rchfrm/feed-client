// IMPORT PACKAGES
import React from 'react'
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
const connectionsReducer = (connectionsState, connectionsAction) => {
  switch (connectionsAction.type) {
    case 'set-all':
      return connectionsAction.payload
    case 'set-platform':
      return {
        ...connectionsState,
        [connectionsAction.payload.platform]: {
          platform: connectionsAction.payload.platform,
          name: connectionsAction.payload.name,
          url: connectionsAction.payload.url,
          valid: !!connectionsAction.payload.url,
        },
      }
    case 'toggle-platform-validity':
      return {
        ...connectionsState,
        [connectionsAction.payload.platform]: {
          ...connectionsState[connectionsAction.payload.platform],
          valid: !connectionsState[connectionsAction.payload.platform].valid,
        },
      }
    case 'update-priority-dsp':
      return {
        ...connectionsState,
        [connectionsAction.payload.platform]: {
          ...connectionsState[connectionsAction.payload.platform],
          priority: connectionsAction.payload.priority,
        },
      }
    default:
      throw new Error(`Could not find ${connectionsAction.type} in integrationDetailsReducer`)
  }
}

function IntegrationsLoader(props) {
  // REDEFINE PROPS AS VARIABLES
  const { artistId } = props
  const { artistName } = props
  // REDEFINE PROPS AS VARIABLES

  // DEFINE STATE
  const [artistLoading, setArtistLoading] = React.useState(true)
  const [gettingArtist, setGettingArtist] = React.useState(false)
  const [priorityDSP, setPriorityDSP] = React.useState(undefined)
  const [connections, setConnections] = React.useReducer(connectionsReducer, initialConnectionsState)
  // END DEFINE STATE

  // DEFINE FUNCTION TO RETRIEVE ARTIST INFORMATION
  const getArtist = React.useCallback(async () => {
    // Request artist information from the server
    const artist = await artistHelpers.getArtist(artistId)
      .catch(err => console.error(err))
    // Handle no artist
    if (!artist) return {}
    // Format artist integrations into an object
    const urlNames = Object.keys(artist.URLs)
    return urlNames.reduce((obj, name) => {
      const platform = helper.extractPlatformFromPriorityDSP(name)
      const url = artist[name]
      return {
        ...obj,
        [platform]: {
          platform,
          name,
          url,
          valid: !!url,
        },
      }
    }, {})
  }, [artistId])
  // END DEFINE FUNCTION TO RETRIEVE ARTIST INFORMATION

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
      .then(integrations => {
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
      priorityDSP={priorityDSP}
      setConnections={setConnections}
      setPriorityDSP={setPriorityDSP}
    />
  )
}

export default IntegrationsLoader
