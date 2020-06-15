import React from 'react'
import PropTypes from 'prop-types'

import PlayBrokenIcon from '@/icons/PlayBrokenIcon'
import PlayIcon from '@/icons/PlayIcon'
import MediaFallback from '@/elements/MediaFallback'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

import popupStore from '@/store/popupStore'

import styles from '@/PostImage.module.css'

const getMediaTest = ({ mediaSrc, handleError }) => {
  return (
    <video
      style={{
        position: 'absolute',
        left: '-10000em',
        opacity: 0,
      }}
      src={mediaSrc}
      onError={() => handleError('video')}
      width="100%"
      controls
      playsInline
      type="video/mp4"
    />
  )
}

const getPopupMedia = ({
  mediaSrc,
  mediaType,
  thumbnailSrc,
  title,
}) => {
  const src = mediaSrc || thumbnailSrc
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
  if (mediaType === 'video') {
    return (
      <video
        src={src}
        poster={thumbnailSrc}
        width="100%"
        controls
        autoPlay
        type="video/mp4"
      />
    )
  }

  // Handle image (default)
  return (
    <img
      src={thumbnailSrc}
      alt={title}
    />
  )
}


const PostImage = ({ mediaSrc, thumbnailOptions, title, className, aspectRatio }) => {
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
  }, [setVideoError])

  // Get the thumbnail
  const thumbnailImageSrc = React.useMemo(() => {
    // If there is a thumbnail src, use that
    if (setActiveThumbSrc) return setActiveThumbSrc
    // If youtube, get youtube thumb
    if (mediaType === 'youtube_embed') return utils.getVideoThumb(mediaSrc)
    // If video with no src, then no thumbnail
    if (mediaType === 'video') return null
  }, [setActiveThumbSrc, mediaType, mediaSrc])


  // Test for broken videos
  const mediaTest = React.useMemo(() => {
    if (mediaType !== 'video' || videoError) return null
    return getMediaTest({ mediaSrc, handleError })
  }, [mediaType, mediaSrc, videoError, handleError])

  // Define play icon
  const playIcon = React.useMemo(() => {
    if (videoError) {
      return <PlayBrokenIcon className={[styles.playIcon, styles._broken].join(' ')} color={brandColors.bgColor} />
    }
    if ((mediaType === 'video' || mediaType === 'youtube_embed') && !videoError) {
      return <PlayIcon className={styles.playIcon} color={brandColors.bgColor} />
    }
    return null
  }, [mediaType, videoError])

  // SHOW LARGE IMAGE in Popup
  const setPopupContents = popupStore(state => state.setContent)
  const closePopup = popupStore(state => state.clear)
  const enlargeMedia = React.useCallback(() => {
    const popupContents = getPopupMedia({ mediaSrc, mediaType, setActiveThumbSrc, title })
    setPopupContents(popupContents)
  }, [mediaSrc, mediaType, setActiveThumbSrc, title, setPopupContents])
  // Close popup when unmounts
  React.useEffect(() => {
    return closePopup
  }, [closePopup])

  // Wait here until media is ready
  if (!thumbnailImageSrc) return null

  return (
    <figure
      className={[
        'media',
        `media--${aspectRatio}`,
        styles.figure,
        videoError || thumbError ? styles._brokenThumb : '',
        className,
      ].join(' ')}
    >
      {/* Test for broken videos */}
      {mediaTest}
      {/* Thumbnail fallback */}
      {(thumbError || !thumbnailImageSrc) && <MediaFallback />}
      {/* Show play icon */}
      {playIcon && (
        <button
          className={styles.playIconBg}
          aria-label="Play video"
          onClick={enlargeMedia}
        >
          {playIcon}
        </button>
      )}
      {/* Enlarge media button */}
      {!videoError && !thumbError && !playIcon && (
        <button
          className={styles.enlargeImageButton}
          aria-label="Enlarge image"
          onClick={enlargeMedia}
        />
      )}
      {/* Thumbnail */}
      {thumbnailImageSrc && !thumbError && (
        <img
          className="center--image"
          src={thumbnailImageSrc}
          alt={title}
          onError={() => handleError('thumb')}
          onLoad={({ target }) => {
            // Handle 1px FB safe images
            if (target.naturalHeight === 1) {
              handleError('thumb')
            }
          }}
        />
      )}
    </figure>
  )
}

PostImage.propTypes = {
  mediaSrc: PropTypes.string,
  thumbnailOptions: PropTypes.array,
  title: PropTypes.string,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
}

PostImage.defaultProps = {
  mediaSrc: '',
  thumbnailOptions: [],
  title: '',
  className: '',
  aspectRatio: 'square',
}


export default PostImage
