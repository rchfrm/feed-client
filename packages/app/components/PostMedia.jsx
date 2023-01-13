import React from 'react'
import PropTypes from 'prop-types'

import PostCardMedia from '@/app/PostCardMedia'
import PostScore from '@/app/PostScore'

const PostMedia = ({ post }) => {
  const {
    media,
    mediaType,
    thumbnails,
    postType,
    videoFallback,
    message,
    organicResults,
  } = post

  return (
    <div className="relative">
      <PostCardMedia
        media={media}
        mediaType={mediaType}
        thumbnails={thumbnails}
        postType={postType}
        videoFallback={videoFallback}
        caption={message}
        className="mb-2"
      />
      <PostScore
        score={organicResults.normalizedScore}
        className="right-4 bottom-4"
      />
    </div>
  )
}

PostMedia.propTypes = {
  post: PropTypes.object.isRequired,
}

PostMedia.defaultProps = {
}

export default PostMedia
