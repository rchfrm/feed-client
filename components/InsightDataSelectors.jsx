import React from 'react'
import PropTypes from 'prop-types'

import * as chartHelpers from './helpers/chartHelpers'

import useScrollToButton from './hooks/useScrollToButton'

import styles from './InsightSelectors.module.css'
import brandColors from '../constants/brandColors'

const InsightDataSelectors = ({
  availableDataSources,
  currentPlatform,
  currentDataSource,
  setCurrentDataSource,
  initialLoading,
}) => {
  // Return array of data sources that match the current platform
  const platformSources = React.useMemo(() => {
    if (!currentPlatform) return []
    return chartHelpers.getPlatformSources(availableDataSources, currentPlatform)
  }, [currentPlatform])

  // Set first data sources as active when platfrorm changes
  React.useEffect(() => {
    if (!platformSources.length) return
    // Get and set initial data source
    const source = chartHelpers.getInitialDataSource(platformSources, currentPlatform)
    setCurrentDataSource(source)
    // Set hover color
    const { bg: platformColor } = brandColors[currentPlatform]
    const dataSelectors = document.getElementById('dataSelectors')
    if (!dataSelectors) return
    dataSelectors.style.setProperty('--active-color', platformColor)
  }, [platformSources])

  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(platformSources, currentDataSource)

  if (initialLoading) return null

  return (
    <div className={styles.selectorsOuter}>
      <p className={['inputLabel__text', styles.selectorsLabel].join(' ')}>Select a data set</p>
      <div id="dataSelectors" className={styles.dataSelectors} ref={containerRef}>
        {platformSources.map(({ title, subtitle, id }, i) => {
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
