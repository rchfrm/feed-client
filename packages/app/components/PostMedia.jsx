import React from 'react'
import PropTypes from 'prop-types'

import PostCardMedia from '@/app/PostCardMedia'
import PostScore from '@/app/PostScore'

const PostMedia = ({ post }) => {
  const {
    media,
    thumbnails,
    postType,
    organicMetrics,
  } = post

  return (
    <div className="relative">
      <PostCardMedia
        media={media}
        thumbnails={thumbnails}
        postType={postType}
      />
      <PostScore
        score={organicMetrics.normalizedScore}
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
