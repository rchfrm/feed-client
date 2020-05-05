import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import server from './helpers/server'

import styles from './InsightsPage.module.css'

const fetchData = async ({ artistId, currentDataSource }) => {
  const data = await server.getDataSourceGrowth(currentDataSource, artistId)
  console.log('data', data)
  return data
}

const InsightsProjection = ({
  artistId,
  currentPlatform,
  currentDataSource,
}) => {
  const { data, error, pending } = useAsync({
    promiseFn: fetchData,
    watchFn: (newProps, oldProps) => {
      const { artistId, currentDataSource } = newProps
      const { artistId: prevArtistId, currentDataSource: previousDataSource } = oldProps
      if (artistId !== !prevArtistId) return true
      if (currentDataSource !== previousDataSource) return true
      return false
    },
    // The variable(s) to pass to promiseFn
    artistId,
    currentDataSource,
  })

  // Define clases
  const containerClasses = [styles.projectionContainer]
  if (pending) {
    containerClasses.push(styles._loading)
  }

  return (
    <div className={containerClasses.join(' ')}>
      Data
    </div>
  )
}

InsightsProjection.propTypes = {
  artistId: PropTypes.string.isRequired,
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
}

export default InsightsProjection
