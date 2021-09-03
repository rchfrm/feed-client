import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'
import PostCardCaption from '@/app/PostCardCaption'

import CommentIcon from '@/icons/CommentIcon'
import CloseCircle from '@/icons/CloseCircle'

import brandColors from '@/constants/brandColors'

const PostCardMedia = ({
  media,
  thumbnails,
  caption,
  postType,
  className,
  style,
}) => {
  const [hasMedia, setHasMedia] = React.useState(!!media)
  const [selectedThumbnail, setSelectedThumbnail] = React.useState({})
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setHasMedia(!!media)
  }, [media])

  // TOGGLE CAPTION
  const [isCaptionVisible, setIsCaptionVisible] = React.useState(false)

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
          'w-full relative bg-grey-1',
          !ready && hasMedia ? 'opacity-0' : 'opacity-1',
        ].join(' ')}
        style={{ paddingTop: '100%' }}
      >
        {/* POST IMAGE (if there is media) */}
        {hasMedia && (
          <>
            {/* BLURRED BG (if there is a thumbnail and it's not square) */}
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
            {/* THUMBNAIL */}
            <div
              className={[
                'absolute top-0 left-0 w-full h-full',
                // Landscape thumb
                selectedThumbnail.src && selectedThumbnail.ratio > 1 ? 'px-3' : null,
              ].join(' ')}
            >
              <PostImage
                className="h-full"
                mediaSrc={media}
                thumbnailOptions={thumbnails}
                title={caption}
                isStory={postType === 'story'}
                onFinishedSelection={(thumbnail = {}) => {
                  setSelectedThumbnail(thumbnail)
                  setReady(true)
                }}
              />
            </div>
          </>
        )}
        {/* CAPTION BUTTON */}
        {hasMedia && caption && postType !== 'story' && (
          <button
            aria-label={isCaptionVisible ? 'Close Caption' : 'Show Caption'}
            onClick={() => setIsCaptionVisible(!isCaptionVisible)}
            className="absolute bottom-0 right-0 px-6 py-5"
            style={{ zIndex: 3 }}
          >
            {isCaptionVisible ? (
              <CloseCircle className="w-5 h-auto" />
            ) : (
              <CommentIcon className="w-6 h-auto" fillBubble={brandColors.blue} />
            )}
          </button>
        )}
        {(!hasMedia || isCaptionVisible) && (
          <PostCardCaption
            caption={caption}
            style={{ zIndex: 2 }}
          />
        )}
      </div>
    </div>
  )
}

PostCardMedia.propTypes = {
  media: PropTypes.string,
  thumbnails: PropTypes.array,
  caption: PropTypes.string,
  postType: PropTypes.string,
  className: PropTypes.string,
}

PostCardMedia.defaultProps = {
  media: '',
  thumbnails: [],
  caption: '',
  postType: '',
  className: null,
}

export default PostCardMedia
