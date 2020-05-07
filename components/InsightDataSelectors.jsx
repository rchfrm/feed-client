import React from 'react'
import PropTypes from 'prop-types'

import useScrollToButton from './hooks/useScrollToButton'

import styles from './InsightSelectors.module.css'
import insightDataSources from '../constants/insightDataSources'
import brandColors from '../constants/brandColors'

const getDefaultSource = (sources) => {
  const followersSourceIndex = sources.findIndex(({ id: sourceId }) => {
    return sourceId.includes('follower')
  })
  const likesSourceIndex = sources.findIndex(({ id: sourceId }) => {
    return sourceId.includes('likes')
  })
  if (followersSourceIndex > -1) return sources[followersSourceIndex]
  if (likesSourceIndex > -1) return sources[likesSourceIndex]
  return sources[0]
}

const InsightDataSelectors = ({
  availableDataSources,
  currentPlatform,
  currentDataSource,
  setCurrentDataSource,
  initialLoading,
}) => {
  // Return array of data sources that match the current platform
  const availableSources = React.useMemo(() => {
    if (!currentPlatform) return []
    return availableDataSources.reduce((sources, sourceId) => {
      const {
        id,
        title,
        visible,
        breakdown,
        subtitle,
        period,
        platform,
      } = insightDataSources[sourceId]
      // Ignore if not related to current platform
      if (platform !== currentPlatform) return sources
      // Ignore is not visible or a breakdown
      if (!visible || breakdown) return sources
      return [...sources, {
        title,
        id,
        subtitle: subtitle || period,
      }]
    }, [])
  }, [currentPlatform])

  // Set first data sources as active when platfrorm changes
  React.useEffect(() => {
    if (!availableSources.length) return
    const { id: sourceId } = getDefaultSource(availableSources)
    // Set current source
    setCurrentDataSource(sourceId)
    // Set hover color
    const { bg: platformColor } = brandColors[currentPlatform]
    const dataSelectors = document.getElementById('dataSelectors')
    if (!dataSelectors) return
    dataSelectors.style.setProperty('--active-color', platformColor)
  }, [currentPlatform])

  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(availableSources, currentDataSource)

  if (initialLoading) return null

  return (
    <div className={styles.selectorsOuter}>
      <p className={['inputLabel__text', styles.selectorsLabel].join(' ')}>Select a data set</p>
      <div id="dataSelectors" className={styles.dataSelectors} ref={containerRef}>
        {availableSources.map(({ title, subtitle, id }, i) => {
          const activeClass = currentDataSource === id ? styles._active : ''
          return (
            <a
              role="button"
              key={id}
              ref={buttonRefs[i]}
              className={[styles.dataButtonContainer, activeClass].join(' ')}
              onClick={() => setCurrentDataSource(id)}
            >
              <span className={styles.dataButton_title}>{title}</span>
              {subtitle && (
                <>
                  <br />
                  <span className={[styles.dataButton_subtitle, 'small--p'].join(' ')}>{subtitle}</span>
                </>
              )}
            </a>
          )
        })}

      </div>
    </div>
  )
}

InsightDataSelectors.propTypes = {
  availableDataSources: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
  setCurrentDataSource: PropTypes.func.isRequired,
  initialLoading: PropTypes.bool.isRequired,
}

export default InsightDataSelectors
