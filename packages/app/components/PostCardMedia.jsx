import React from 'react'
import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

const PostCardMedia = ({
  media,
  thumbnails,
  caption,
  className,
}) => {
  const [hasMedia, setHasMedia] = React.useState(true)
  React.useEffect(() => {
    setHasMedia(!!media)
  }, [media])
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {hasMedia && (
        <div>
          <PostImage
            mediaSrc={media}
            thumbnailOptions={thumbnails}
            title={caption}
            setHasMedia={setHasMedia}
          />
        </div>
      )}
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
