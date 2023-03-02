import React from 'react'
import PropTypes from 'prop-types'
import PostCardMedia from '@/app/PostCardMedia'

const PostContentMediaMobile = ({ post }) => {
  const {
    media,
    mediaType,
    thumbnails,
    postType,
    videoFallback,
    message,
  } = post

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 col-start-3 relative mb-10">
        <PostCardMedia
          media={media}
          mediaType={mediaType}
          thumbnails={thumbnails}
          postType={postType}
          videoFallback={videoFallback}
          caption={message}
        />
      </div>
    </div>
  )
}

PostContentMediaMobile.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostContentMediaMobile
