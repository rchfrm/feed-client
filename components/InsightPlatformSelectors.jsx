import React from 'react'
import PropTypes from 'prop-types'

import Button from './elements/Button'
import Icon from './elements/Icon'

import useScrollToButton from './hooks/useScrollToButton'

import dataSourceDetails from '../constants/dataSources'
import brandColors from '../constants/brandColors'

import styles from './InsightSelectors.module.css'

const InsightPlatformSelectors = ({
  artist,
  artistId,
  currentPlatform,
  setCurrentPlatform,
}) => {
  // GET ALL AVAILABLE PLATFORMS
  const availablePlatforms = React.useMemo(() => {
    // Get name of platform from data source
    const dataSourcePlatforms = dataSources.map(({ id: source }) => {
      const platformName = source.split('_')[0]
      return platformName
    })
    // Get platforms by removing duplicates from above
    const allPlatforms = dataSourcePlatforms.reduce((platforms, platformName) => {
      // Ignore apple source
      if (platformName === 'apple') return platforms
      // Ignore platform if already included
      if (platforms.find(({ id }) => id === platformName)) return platforms
      // Add platform to array
      return [...platforms, {
        id: platformName,
        title: platformName,
      }]
    }, [])
    // return results
    return allPlatforms
  }, [artistId])

  // SETUP SCROLL TO BUTTON
  const [buttonRefs, containerRef] = useScrollToButton(availablePlatforms, currentPlatform)

  // SET FIRST PLATFORM AS CURRENT
  React.useEffect(() => {
    if (!availablePlatforms.length) return
    // Set the current platform to the first
    setCurrentPlatform(availablePlatforms[0].id)
  }, [availablePlatforms])

  // CHANGE ACTIVE COLOR
  React.useEffect(() => {
    if (!currentPlatform) return
    // Set hover color
    const { color: platformColor } = dataSourceDetails[currentPlatform]
    const dataSelectors = document.getElementById('platformSelectors')
    dataSelectors.style.setProperty('--active-color', platformColor)
  }, [currentPlatform])


  if (!availablePlatforms.length) return null

  return (
    <div className={styles.selectorsOuter}>
      <p className={['inputLabel__text', styles.selectorsLabel].join(' ')}>Select a platform</p>
      <div id="platformSelectors" className={styles.platformSelectors} ref={containerRef}>
        {availablePlatforms.map(({ title, id }, i) => {
          const { color: platformColor } = dataSourceDetails[id]
          const active = id === currentPlatform
          const activeClass = active ? styles._active : ''
          const iconColor = platformColor
          const borderColor = active ? platformColor : 'transparent'
          const { textColor } = brandColors
          const buttonStyle = {
            backgroundColor: 'transparent',
            border: `2px solid ${borderColor}`,
            color: textColor,
          }
          return (
            <div
              key={id}
              ref={buttonRefs[i]}
              className={[styles.platformButtonContainer, activeClass].join(' ')}
            >
              <Button
                className={styles.platformButton}
                version="black small icon"
                style={buttonStyle}
                onClick={() => setCurrentPlatform(id)}
              >
                <Icon color={iconColor} version={id} />
                {title}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

InsightPlatformSelectors.propTypes = {
  artist: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  currentPlatform: PropTypes.string,
  setCurrentPlatform: PropTypes.func.isRequired,
}

InsightPlatformSelectors.defaultProps = {
  currentPlatform: '',
}


export default InsightPlatformSelectors
