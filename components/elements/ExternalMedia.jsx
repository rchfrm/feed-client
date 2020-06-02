import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '../helpers/utils'

import MediaFallback from './MediaFallback'

const ExternalMedia = ({ mediaSrc, thumbnailSrc, title, className }) => {
  const mediaType = React.useMemo(() => {
    return utils.getPostMediaType(mediaSrc)
  }, [mediaSrc])

  const [videoError, setVideoError] = React.useState(false)
  const [thumbError, setThumbError] = React.useState(false)

  // Handle media error
  const handleError = React.useCallback(() => {
    // If error with a video, fallback to basic image
    if (mediaType === 'video') {
      setVideoError(true)
      return
    }
    setThumbError(true)
  }, [mediaType, mediaSrc])

  // Handle image error
  if (thumbError) return <MediaFallback className={className} />

  // Handle youtube
  if (mediaType === 'youtube_embed') {
    return (
      <iframe
        className={['center-image', className].join(' ')}
        title={title}
        src={mediaSrc.replace('autoplay=1', 'autoplay=0')}
        width="100%"
        height="315"
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  // Handle video
  if (mediaType === 'video' && !videoError) {
    return (
      <video
        className={['center-image', className].join(' ')}
        src={mediaSrc}
        poster={thumbnailSrc}
        onError={handleError}
        width="100%"
        controls
        playsInline
        type="video/mp4"
      />
    )
  }

  // Handle image (default)
  return (
    <img
      className={['center-image', className].join(' ')}
      src={thumbnailSrc}
      alt={title}
      onError={handleError}
    />
  )
}

ExternalMedia.propTypes = {
  mediaSrc: PropTypes.string.isRequired,
  thumbnailSrc: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
}

ExternalMedia.defaultProps = {
  thumbnailSrc: '',
  title: '',
  className: '',
}


export default ExternalMedia
