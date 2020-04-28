import React from 'react'
import PropTypes from 'prop-types'

import useScrollToButton from './hooks/useScrollToButton'

import styles from './InsightSelectors.module.css'
import insightDataSources from '../constants/insightDataSources'

const InsightDataSelectors = ({
  currentPlatform,
  currentDataSource,
  setCurrentDataSource,
}) => {
  // Return array of data sources that match the current platform
  const availableSources = React.useMemo(() => {
    if (!currentPlatform) return []
    console.log('insightDataSources', insightDataSources)
    console.log('Object.values(insightDataSources)', Object.values(insightDataSources))
    return Object.values(insightDataSources).reduce((sources, {
      id,
      title,
      visible,
      breakdown,
      subtitle,
      period,
      platform,
    }) => {
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
    const firstSource = availableSources[0]
    if (!firstSource) return
    const { id } = firstSource
    setCurrentDataSource(id)
  }, [currentPlatform])

  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(availableSources, currentDataSource)

  return (
    <div className="ninety-wide">
      <p className={['inputLabel__text', styles.dataSelectors__label].join(' ')}>Select a data set</p>
      <div className={styles.dataSelectors} ref={containerRef}>
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
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
  setCurrentDataSource: PropTypes.func.isRequired,
}

export default InsightDataSelectors
