import React from 'react'
import PropTypes from 'prop-types'
import PostImage from '@/PostImage'

const PostCardMedia = ({
  media,
  mediaType,
  videoFallback,
  thumbnails,
  caption,
  postType,
  className,
  fallbackClassName,
  style,
}) => {
  const [hasMedia, setHasMedia] = React.useState(!! media)
  const [selectedThumbnail, setSelectedThumbnail] = React.useState({})
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setHasMedia(!! media)
  }, [media])

  return (
    <div
      className={[
        'relative rounded-dialogue overflow-hidden',
        className,
      ].join(' ')}
      style={style}
    >
      <div
        className={[
          'w-full relative bg-grey-light',
          ! ready && hasMedia ? 'opacity-0' : 'opacity-1',
        ].join(' ')}
        style={{ paddingTop: '100%' }}
      >
        {hasMedia && (
          <>
            {selectedThumbnail.src && selectedThumbnail.ratio !== 1 && (
              <div
                className="absolute w-full h-full blurred--image--bg"
                style={{
                  backgroundImage: `url(${selectedThumbnail.src})`,
                  width: '110%',
                  height: '110%',
                  left: '-5%',
                  top: '-5%',
                }}
              />
            )}
            <div
              className={[
                'absolute top-0 left-0 w-full h-full',
                selectedThumbnail.src && selectedThumbnail.ratio > 1 ? 'px-3' : null,
              ].join(' ')}
            >
              <PostImage
                className="h-full"
                mediaSrc={media}
                mediaType={mediaType}
                videoFallback={videoFallback}
                thumbnailOptions={thumbnails}
                title={caption}
                isStory={postType === 'story'}
                isReel={postType === 'reels'}
                onFinishedSelection={(thumbnail = {}) => {
                  setSelectedThumbnail(thumbnail)
                  setReady(true)
                }}
                fallbackClassName={fallbackClassName}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

PostCardMedia.propTypes = {
  media: PropTypes.string,
  mediaType: PropTypes.string,
  thumbnails: PropTypes.array,
  videoFallback: PropTypes.string,
  caption: PropTypes.string,
  postType: PropTypes.string,
  className: PropTypes.string,
  fallbackClassName: PropTypes.string,
}

PostCardMedia.defaultProps = {
  media: '',
  mediaType: '',
  thumbnails: [],
  videoFallback: '',
  caption: '',
  postType: '',
  className: null,
  fallbackClassName: null,
}

export default PostCardMedia
