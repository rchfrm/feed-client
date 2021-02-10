import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'
import PostCardCaption from '@/app/PostCardCaption'

const PostCardMedia = ({
  media,
  thumbnails,
  caption,
  className,
}) => {
  const [hasMedia, setHasMedia] = React.useState(true)
  const [selectedThumbnail, setSelectedThumbnail] = React.useState({})
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setHasMedia(!!media)
  }, [media])

  return (
    <div
      className={[
        'relative rounded-dialogue overflow-hidden',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'w-full relative bg-grey-1',
          !ready && hasMedia ? 'opacity-0' : 'opacity-1',
        ].join(' ')}
        style={{ paddingTop: '100%' }}
      >
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
        {/* POST IMAGE (if there is media) */}
        {hasMedia && (
          <div
            className={[
              'absolute top-0 left-0 w-full h-full',
              selectedThumbnail.src && selectedThumbnail.ratio > 1 ? 'px-3' : null,
            ].join(' ')}
          >
            <PostImage
              className="h-full"
              mediaSrc={media}
              thumbnailOptions={thumbnails}
              title={caption}
              onFinishedSelection={(thumbnail = {}) => {
                setSelectedThumbnail(thumbnail)
                setReady(true)
              }}
            />
          </div>
        )}
        {/* POST CAPTION */}
        {!hasMedia && (
          <PostCardCaption
            caption={caption}
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
  className: PropTypes.string,
}

PostCardMedia.defaultProps = {
  media: '',
  thumbnails: [],
  caption: '',
  className: null,
}

export default PostCardMedia
