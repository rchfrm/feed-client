import React from 'react'
import PropTypes from 'prop-types'

import Button from './elements/Button'
import Icon from './elements/Icon'

import useScrollToButton from './hooks/useScrollToButton'

import insightDataSources from '../constants/insightDataSources'
import brandColors from '../constants/brandColors'

import styles from './InsightSelectors.module.css'

const InsightPlatformSelectors = ({
  artistId,
  availableDataSources,
  currentPlatform,
  setCurrentPlatform,
  initialLoading,
}) => {
  // GET ALL AVAILABLE PLATFORMS
  const availablePlatforms = React.useMemo(() => {
    // Get name of platform from data source
    const dataSourcePlatforms = availableDataSources.map((source) => {
      const { platform } = insightDataSources[source]
      return platform
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

  // SET INITIAL PLATFORM
  React.useEffect(() => {
    if (!availablePlatforms.length) return
    // Does the artist have insta
    const instaIndex = availablePlatforms.findIndex(({ id: platformId }) => platformId === 'instagram')
    // If the artist has insta, use this
    if (instaIndex > -1) {
      setCurrentPlatform(availablePlatforms[instaIndex].id)
      return
    }
    // Else just use the first one
    setCurrentPlatform(availablePlatforms[0].id)
  }, [availablePlatforms])

  // CHANGE ACTIVE COLOR
  React.useEffect(() => {
    if (!currentPlatform) return
    // Set hover color
    const platformColor = brandColors[currentPlatform]
    const dataSelectors = document.getElementById('platformSelectors')
    if (!dataSelectors) return
    dataSelectors.style.setProperty('--active-color', platformColor)
  }, [currentPlatform])


  if (!availablePlatforms.length) return null

  if (initialLoading) return null

  return (
    <div className={styles.selectorsOuter}>
      <p className={['inputLabel__text', styles.selectorsLabel].join(' ')}>Select a platform</p>
      <div id="platformSelectors" className={styles.platformSelectors} ref={containerRef}>
        {availablePlatforms.map(({ title, id }, i) => {
          const platformColor = brandColors[id]
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
  artistId: PropTypes.string.isRequired,
  availableDataSources: PropTypes.array.isRequired,
  currentPlatform: PropTypes.string,
  setCurrentPlatform: PropTypes.func.isRequired,
  initialLoading: PropTypes.bool.isRequired,
}

InsightPlatformSelectors.defaultProps = {
  currentPlatform: '',
}


export default InsightPlatformSelectors
