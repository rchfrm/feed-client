import React from 'react'
import PropTypes from 'prop-types'

import PlayBrokenIcon from '@/icons/PlayBrokenIcon'
import PlayIcon from '@/icons/PlayIcon'
import MediaFallback from '@/elements/MediaFallback'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

import popupStore from '@/store/popupStore'

const getMediaTest = ({ mediaSrc, handleError }) => {
  return (
    <video
      style={{
        position: 'absolute',
        left: '-10000em',
        opacity: 0,
      }}
      src={mediaSrc}
      onError={handleError}
      width="100%"
      controls
      playsInline
      type="video/mp4"
    />
  )
}

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
      <div className="popup--iframe">
        <iframe
          title={title}
          src={src.replace('autoplay=1', 'autoplay=0')}
          width="100%"
          height="315"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Handle video
  if (mediaType === 'video' && !videoError) {
    return (
      <video
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
  }, [mediaType, videoError])

  // Get the thumbnail
  const thumbnailImageSrc = React.useMemo(() => {
    // If there is a thumbnail src, use that
    if (thumbnailSrc) return thumbnailSrc
    // If youtube, get youtube thumb
    if (mediaType === 'youtube_embed') return utils.getVideoThumb(mediaSrc)
    // If video with no src, then no thumbnail
    if (mediaType === 'video') return null
  }, [thumbnailSrc, mediaType, mediaSrc])


  // Test for broken videos
  const mediaTest = React.useMemo(() => {
    if (mediaType !== 'video' || videoError) return null
    return getMediaTest({ mediaSrc, handleError })
  }, [mediaType, mediaSrc, videoError, handleError])

  // SHOW LARGE IMAGE
  const setPopupContents = popupStore(state => state.setContent)
  const closePopup = popupStore(state => state.clear)
  const enlargeMedia = React.useCallback(() => {
    const popupContents = getMediaEl({ mediaSrc, mediaType, thumbnailSrc, title, className, thumbError, videoError, handleError })
    setPopupContents(popupContents)
  }, [mediaSrc, mediaType, thumbnailSrc, title, className, thumbError, videoError, handleError])
  // Close popup when unmounts
  React.useEffect(() => {
    return () => {
      closePopup()
    }
  }, [closePopup])

  // Wait here until media is ready
  if (!thumbnailImageSrc) return null

  return (
    <figure className={['media', `media--${aspectRatio}`].join(' ')}>
      {/* Test for broken videos */}
      {mediaTest}
      {/* Show broken video icon */}
      {videoError && (
        <PlayBrokenIcon className="play--icon  -broken" color={brandColors.bgColor} />
      )}
      {/* Show play icon videos */}
      {(mediaType === 'video' || mediaType === 'youtube_embed') && !videoError && (
        <PlayIcon className="play--icon" color={brandColors.bgColor} />
      )}
      {/* Enlarge media button */}
      {!videoError && !thumbError && (
        <button
          className="media--enlarge-trigger"
          aria-label={mediaType === 'video' || mediaType === 'youtube_embed' ? 'Play video' : 'Enlarge image'}
          title={mediaType === 'video' || mediaType === 'youtube_embed' ? 'Play video' : 'Enlarge image'}
          onClick={enlargeMedia}
        />
      )}
      {/* Thumbnail fallback */}
      {(thumbError || !thumbnailImageSrc) && <MediaFallback />}
      {/* Thumbnail */}
      {thumbnailImageSrc && !thumbError && (
        <img
          className="center--image"
          src={thumbnailImageSrc}
          alt={title}
          onError={handleError}
        />
      )}
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
