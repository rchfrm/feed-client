import React from 'react'
import PropTypes from 'prop-types'
import PostCardMedia from '@/app/PostCardMedia'

const PostMedia = ({ post }) => {
  const {
    media,
    mediaType,
    thumbnails,
    postType,
    videoFallback,
    message,
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
    </div>
  )
}

PostMedia.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostMedia
