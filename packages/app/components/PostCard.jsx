import React from 'react'
import PropTypes from 'prop-types'
import PostCardMedia from '@/app/PostCardMedia'
import PostCardActions from '@/app/PostCardActions'

const PostCard = ({
  index,
  post,
  section,
  action,
  className,
  children,
}) => {
  return (
    <div
      className={[
        'relative',
        className,
      ].join(' ')}
    >
      <PostCardMedia
        media={post.media}
        mediaType={post.mediaType}
        videoFallback={post.videoFallback}
        thumbnails={post.thumbnails}
        caption={post.message}
        postType={post.postType}
      />
      <PostCardActions
        post={post}
        index={index}
        section={section}
        action={action}
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
