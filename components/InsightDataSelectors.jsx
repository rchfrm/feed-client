import React from 'react'
import PropTypes from 'prop-types'

import styles from './InsightSelectors.module.css'
import helper from './helpers/helper'

const InsightDataSelectors = ({
  artist,
  currentPlatform,
  currentDataSource,
  setCurrentDataSource,
}) => {
  console.log('artist', artist)
  // Get platforms
  const {
    _embedded: { data_sources: allDataSources },
  } = artist

  // Return array of data sources that match the current platform
  const availableSources = React.useMemo(() => {
    if (!currentPlatform) return []
    return Object.values(allDataSources).reduce((sources, { id: source }) => {
      const platform = source.split('_')[0]
      if (platform !== currentPlatform) return sources
      return [...sources, {
        name: helper.translateDataSourceId(source),
        id: source,
      }]
    }, [])
  }, [currentPlatform])

  // Set first data sources as active when platfrorm changes
  React.useEffect(() => {
    const firstSource = availableSources[0]
    if (!firstSource) return
    const { id } = firstSource
    setCurrentDataSource(id)
  }, [currentPlatform])

  return (
    <div className="ninety-wide">
      <p className={['inputLabel__text', styles.dataSelectors__label].join(' ')}>Select a data set</p>
      <div className={styles.dataSelectors}>
        {availableSources.map(({ name, id }) => {
          const activeClass = currentDataSource === id ? styles._active : ''
          return (
            <a
              role="button"
              key={id}
              className={[styles.dataButtonContainer, activeClass].join(' ')}
              onClick={() => setCurrentDataSource(id)}
            >
              {name}
            </a>
          )
        })}

      </div>
    </div>
  )
}

InsightDataSelectors.propTypes = {
  artist: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
  setCurrentDataSource: PropTypes.string.isRequired,
}

export default InsightDataSelectors
