import React from 'react'
import PropTypes from 'prop-types'
import PostCardMedia from '@/app/PostCardMedia'

const PostCard = ({
  post,
  className,
  children,
}) => {
  const { postType } = post

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostCardMedia
        media={post.media}
        mediaType={post.mediaType}
        videoFallback={post.videoFallback}
        thumbnails={post.thumbnails}
        caption={post.message}
        postType={postType}
      />
      {children}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

PostCard.defaultProps = {
  className: null,
  children: null,
}

export default PostCard
