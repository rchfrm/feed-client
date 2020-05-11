// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import { useImmerReducer } from 'use-immer'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT COMPONENTS
import PostConnectionsConnection from './PostConnectionsConnection'
// IMPORT HELPERS
import utils from './helpers/utils'
// IMPORT STYLES
import styles from './Integrations.module.css'

// Create object of keyed connections
const getConnections = (artist) => {
  return Object.keys(artist.URLs).reduce((obj, name, index) => {
    const platform = utils.extractPlatformFromPriorityDSP(name)
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
}

// Create array of connection platforms, sorted
const getConnectionPlatforms = (integrations) => {
  return Object.values(integrations).reduce((arr, { platform, index }) => {
    arr[index] = platform
    return arr
  }, [])
}

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

function PostConnections({ className }) {
  // Get artist context
  const {
    artist,
    setPriorityDSP: setArtistPriorityDSP,
    setConnection,
  } = React.useContext(ArtistContext)
  const initialConnections = getConnections(artist)
  const [connections, setConnections] = useImmerReducer(connectionsReducer, initialConnections)
  const connectionPlatforms = getConnectionPlatforms(initialConnections)
  const [priorityDSP, setPriorityDSP] = React.useState(artist.priority_dsp)

  const udpatePriorityDSP = React.useCallback((dsp) => {
    setPriorityDSP(dsp)
    setArtistPriorityDSP(dsp)
  }, [])

  const udpateConnections = React.useCallback(({ type, payload }) => {
    setConnections({ type, payload })
    // If updating connection, also update artist context
    if (type === 'set-platform') {
      const { platform, url } = payload
      const adjustedPlatform = utils.convertPlatformToPriorityDSP(platform)
      setConnection({ platform: adjustedPlatform, url })
    }
  }, [])

  // LIST INTEGRATIONS
  const connectionsList = connectionPlatforms.map(platform => {
    return (
      <PostConnectionsConnection
        key={platform}
        artist={artist}
        platform={platform}
        priorityDSP={priorityDSP}
        url={connections[platform].url || ''}
        valid={connections[platform].valid}
        udpateConnections={udpateConnections}
        udpatePriorityDSP={udpatePriorityDSP}
      />
    )
  })

  return (
    <ul className={[styles['integrations-list'], className].join(' ')}>{connectionsList}</ul>
  )
}

PostConnections.propTypes = {
  className: PropTypes.string,
}

PostConnections.defaultProps = {
  className: '',
}


export default PostConnections
