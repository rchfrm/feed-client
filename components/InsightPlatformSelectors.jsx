import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from './contexts/Artist'

const InsightPlatformSelectors = () => {
  const { artist, artistId } = React.useContext(ArtistContext)
  const {
    priority_social_platform: socialPlatform,
    _embedded: { data_sources: dataSources },
  } = artist
  console.log('artist', artist)
  console.log('socialPlatform', socialPlatform)
  console.log('dataSources', dataSources)
  return (
    <div>
      Buttons
    </div>
  )
}

InsightPlatformSelectors.propTypes = {
  
}

export default InsightPlatformSelectors
