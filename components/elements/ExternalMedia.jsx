import React from 'react'
import PropTypes from 'prop-types'

import PlayIcon from '../icons/PlayIcon'
import MediaFallback from './MediaFallback'

import * as utils from '../helpers/utils'
import brandColors from '../../constants/brandColors'

const getMediaEl = ({
  mediaSrc,
  mediaType,
  thumbnailSrc,
  title,
  thumbError,
  videoError,
  handleError,
}) => {
  const src = mediaSrc || thumbnailSrc
  // Handle image error
  if (thumbError) return <MediaFallback />

  // Handle youtube
  if (mediaType === 'youtube_embed') {
    return (
      <iframe
        className="center--image"
        title={title}
        src={src.replace('autoplay=1', 'autoplay=0')}
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
    console.log('return video')
    return (
      <video
        className="center--image"
        src={src}
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
      className="center--image"
      src={thumbnailSrc}
      alt={title}
      onError={handleError}
    />
  )
}

const ExternalMedia = ({ mediaSrc, thumbnailSrc, title, className, aspectRatio }) => {
  const mediaType = React.useMemo(() => {
    return utils.getPostMediaType(mediaSrc || thumbnailSrc)
  }, [mediaSrc, thumbnailSrc])

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


  // Get the media
  const media = React.useMemo(() => {
    if (!mediaType) return null
    return getMediaEl({ mediaSrc, mediaType, thumbnailSrc, title, className, thumbError, videoError, handleError })
  }, [mediaSrc, mediaType, videoError, thumbError])

  // Wait here until media is ready
  if (!media) return null

  return (
    <figure className={['media', `media--${aspectRatio}`].join(' ')}>
      {/* Show play icon for broken videos */}
      {mediaType === 'video' && videoError && (
        <PlayIcon className="play--icon" color={brandColors.bgColor} />
      )}
      {media}
    </figure>
  )
}

ExternalMedia.propTypes = {
  mediaSrc: PropTypes.string,
  thumbnailSrc: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
}

ExternalMedia.defaultProps = {
  mediaSrc: '',
  thumbnailSrc: '',
  title: '',
  className: '',
  aspectRatio: 'square',
}


export default ExternalMedia
