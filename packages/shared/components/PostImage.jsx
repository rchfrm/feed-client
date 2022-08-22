import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import PlayBrokenIcon from '@/icons/PlayBrokenIcon'
import PlayIcon from '@/icons/PlayIcon'
import MediaFallback from '@/elements/MediaFallback'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

import usePopupStore from '@/stores/popupStore'

import styles from '@/PostImage.module.css'
import popupStyles from '@/PopupModal.module.css'

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
  closePopup,
  title,
}) => {
  const src = mediaSrc || thumbnailSrc
  // Handle youtube
  if (mediaType === 'iframe') {
    return (
      <iframe
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
    <a className={popupStyles.imageButton} role="button" onClick={closePopup} aria-label="close">
      <img
        src={thumbnailSrc}
        alt={title}
      />
    </a>
  )
}

// Read from popup store
const getPopupStoreState = (state) => ({
  setPopupContents: state.setContent,
  setPopupCaption: state.setCaption,
  setPopupContentType: state.setContentType,
  closePopup: state.clear,
})


const PostImage = ({
  mediaSrc,
  mediaType: currentMediaType,
  videoFallback,
  thumbnailOptions,
  isStory,
  isReel,
  title,
  aspectRatio,
  setSelectedThumbnail,
  onUseFallback,
  onFinishedSelection,
  brokenImageColor,
  className,
}) => {
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
  const [activeMediaSrc, setActiveMediaSrc] = React.useState(mediaSrc)

  // Define media type
  const mediaType = React.useMemo(() => {
    if (currentMediaType === 'video') {
      return utils.getPostMediaType(activeMediaSrc || activeThumbSrc)
    }
    return currentMediaType
  }, [activeMediaSrc, activeThumbSrc, currentMediaType])

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

  // HANDLE THE END
  const [isFinished, setIsFinished] = React.useState(false)
  const onFinish = React.useCallback((thumbnailUsed) => {
    onFinishedSelection(thumbnailUsed)
    setIsFinished(true)
  }, [onFinishedSelection])


  // Trigger use fallback if no thumb src
  React.useEffect(() => {
    if (!thumbnailOptions.length) {
      onUseFallback()
      onFinish()
    }
  }, [onUseFallback, thumbnailOptions, onFinish])

  // Swap to backup thumb src if first errors
  React.useEffect(() => {
    // Stop here if no thumb error or if finished
    if (!thumbError || isFinished) return
    // Try swapping thumb src for backup
    activeThumbIndex.current += 1
    const nextThumbSrc = thumbnails[activeThumbIndex.current]
    if (nextThumbSrc) {
      setActiveThumbSrc(nextThumbSrc)
      setThumbError(false)
    } else {
      // Tell parent fallback was used
      onUseFallback()
      onFinish()
    }
  }, [thumbError, thumbnails, setThumbError, onUseFallback, onFinish, isFinished])

  // Swap to backup video src if first errors
  React.useEffect(() => {
    // Stop here if no video error
    if (!videoError) return
    // Try swapping media src for backup
    if (videoFallback && (activeMediaSrc !== videoFallback)) {
      setActiveMediaSrc(videoFallback)
      setVideoError(false)
    }
  }, [videoError, setVideoError, videoFallback, activeMediaSrc])

  // Get the thumbnail
  const thumbnailImageSrc = React.useMemo(() => {
    // If there is a thumbnail src, use that
    if (activeThumbSrc) return activeThumbSrc
    // If youtube, get youtube thumb
    if (mediaType === 'youtube_embed') return utils.getVideoThumb(activeMediaSrc)
    // If video with no src, then no thumbnail
    if (mediaType === 'video') return null
  }, [activeThumbSrc, mediaType, activeMediaSrc])

  // Test for broken videos
  const mediaTest = React.useMemo(() => {
    if (mediaType !== 'video' || videoError) return null
    return getMediaTest({ mediaSrc: activeMediaSrc, handleError })
  }, [mediaType, activeMediaSrc, videoError, handleError])

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
  const {
    setPopupContents,
    setPopupCaption,
    setPopupContentType,
    closePopup,
  } = usePopupStore(getPopupStoreState, shallow)

  const enlargeMedia = React.useCallback(() => {
    const popupContents = getPopupMedia({ mediaSrc: activeMediaSrc, mediaType, thumbnailSrc: thumbnailImageSrc, closePopup, title })
    setPopupContents(popupContents)
    setPopupCaption(title)
    setPopupContentType(mediaType)
  }, [activeMediaSrc, thumbnailImageSrc, mediaType, title, setPopupContents, setPopupCaption, setPopupContentType, closePopup])

  // Close popup when unmounts
  React.useEffect(() => {
    return closePopup
  }, [closePopup])

  return (
    <figure
      className={[
        'media',
        `media--${aspectRatio}`,
        isStory || isReel ? 'media--story' : null,
        styles.figure,
        thumbError || videoError ? styles._brokenThumb : '',
        className,
      ].join(' ')}
    >
      {/* Test for broken videos */}
      {mediaTest}
      {/* Thumbnail fallback */}
      {(thumbError || !thumbnailImageSrc) && <MediaFallback brokenImageColor={brokenImageColor} />}
      {/* Show broken play button */}
      {videoError && <div className={styles.playIconBg}>{playIcon}</div>}
      {/* Show play icon */}
      {(playIcon && !videoError) && (
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
            const {
              src,
              naturalHeight,
              naturalWidth,
            } = target
            // 1px FB safe images count as en error
            if (naturalHeight === 1) {
              handleError('thumb')
              onFinish()
              return
            }
            // Build thumbnail object
            const thumbnail = {
              src,
              width: naturalWidth,
              height: naturalHeight,
              ratio: naturalWidth / naturalHeight,
            }
            // Set selected thumbnail when loaded
            setSelectedThumbnail(thumbnail)
            onFinish(thumbnail)
          }}
        />
      )}
    </figure>
  )
}

PostImage.propTypes = {
  mediaSrc: PropTypes.string,
  mediaType: PropTypes.string.isRequired,
  thumbnailOptions: PropTypes.array,
  videoFallback: PropTypes.string,
  isStory: PropTypes.bool,
  isReel: PropTypes.bool,
  title: PropTypes.string,
  aspectRatio: PropTypes.string,
  setSelectedThumbnail: PropTypes.func,
  onUseFallback: PropTypes.func,
  onFinishedSelection: PropTypes.func,
  brokenImageColor: PropTypes.string,
  className: PropTypes.string,
}

PostImage.defaultProps = {
  mediaSrc: '',
  thumbnailOptions: [],
  videoFallback: '',
  isStory: false,
  isReel: false,
  title: '',
  aspectRatio: 'square',
  setSelectedThumbnail: () => {},
  onUseFallback: () => {},
  onFinishedSelection: () => {},
  brokenImageColor: brandColors.green,
  className: null,
}


export default PostImage
