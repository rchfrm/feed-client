import React from 'react'
import PropTypes from 'prop-types'

import Button from './elements/Button'
import Icon from './elements/Icon'

import dataSourceDetails from '../constants/dataSources'
import brandColors from '../constants/brandColors'

import styles from './InsightSelectors.module.css'

const InsightPlatformSelectors = ({
  artist,
  artistId,
  currentPlatform,
  setCurrentPlatform,
}) => {
  // Get platforms
  const {
    priority_social_platform: socialPlatform,
    _embedded: { data_sources: dataSources },
  } = artist
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
      if (platforms.includes(platformName)) return platforms
      // Add platform to array
      return [...platforms, platformName]
    }, [])
    // return results
    return allPlatforms
  }, [artistId])

  // SET FIRST PLATFORM AS CURRENT
  React.useEffect(() => {
    if (!availablePlatforms.length) return
    // Set the current platform to the first
    setCurrentPlatform(availablePlatforms[0])
  }, [availablePlatforms])

  console.log('artist', artist)
  console.log('socialPlatform', socialPlatform)
  console.log('dataSources', dataSources)
  console.log('availablePlatforms', availablePlatforms)

  if (!availablePlatforms.length) return null

  return (
    <div className={[styles.platformSelectors, 'ninety-wide'].join(' ')}>
      {availablePlatforms.map((platform) => {
        const { color } = dataSourceDetails[platform]
        const active = platform === currentPlatform
        return (
          <div className={styles.platformButtonContainer} key={platform}>
            <Button
              className={styles.platformButton}
              version="black small icon"
              onClick={() => setCurrentPlatform(platform)}
            >
              <Icon color={color} version={platform} />
              {platform}
            </Button>
          </div>
        )
      })}
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
