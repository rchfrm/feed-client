import React from 'react'
import PropTypes from 'prop-types'

import PlayIcon from '@/icons/PlayIcon'
import MediaFallback from '@/elements/MediaFallback'

import * as utils from '@/helpers/utils'
import brandColors from '~/constants/brandColors'

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
    return (
      <video
        className="center--image"
        src={src}
        poster={thumbnailSrc}
        onError={() => handleError('video')}
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
      onError={() => handleError('thumb')}
      onLoad={({ target }) => {
        // Handle 1px FB safe images
        if (target.naturalHeight === 1) {
          handleError('thumb')
        }
      }}
    />
  )
}

const ExternalMedia = ({ mediaSrc, thumbnailOptions, title, className, aspectRatio }) => {
  // Remove empty and duplicate thumbnail options
  const thumbnails = React.useMemo(() => {
    return thumbnailOptions.reduce((thumbs, thumb) => {
      if (!thumb) return thumbs
      if (thumbs.includes(thumb)) return thumbs
      return [...thumbs, thumb]
    }, [])
  }, [thumbnailOptions])
  // Get active thumb src
  const activeThumbIndex = React.useRef(0)
  const [activeThumbSrc, setActiveThumbSrc] = React.useState(thumbnails[activeThumbIndex.current])
  // Define media type
  const mediaType = React.useMemo(() => {
    return utils.getPostMediaType(mediaSrc || activeThumbSrc)
  }, [mediaSrc, activeThumbSrc])

  // Handle media error
  const [videoError, setVideoError] = React.useState(false)
  const [thumbError, setThumbError] = React.useState(false)
  const handleError = React.useCallback((errorType) => {
    // If error with a video, fallback to basic image
    if (errorType === 'video') {
      setVideoError(true)
      return
    }
    setThumbError(true)
  }, [])

  // Swap to backup thumb src if first errors
  React.useEffect(() => {
    // Stop here if no thumb error
    if (!thumbError) return
    // Try swapping thumb src for backup
    activeThumbIndex.current += 1
    const nextThumbSrc = thumbnails[activeThumbIndex.current]
    if (nextThumbSrc) {
      setActiveThumbSrc(nextThumbSrc)
      setThumbError(false)
    }
  }, [thumbError, thumbnails, setThumbError])


  // Get the media
  const media = React.useMemo(() => {
    if (!mediaType) return null
    return getMediaEl({ mediaSrc, mediaType, thumbnailSrc: activeThumbSrc, title, className, thumbError, videoError, handleError })
  }, [mediaSrc, mediaType, activeThumbSrc, title, className, thumbError, videoError, handleError])

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
  thumbnailOptions: PropTypes.array,
  title: PropTypes.string,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
}

ExternalMedia.defaultProps = {
  mediaSrc: '',
  thumbnailOptions: [],
  title: '',
  className: '',
  aspectRatio: 'square',
}


export default ExternalMedia
