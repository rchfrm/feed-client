import React from 'react'
import PropTypes from 'prop-types'
import PostCardMedia from '@/app/PostCardMedia'
import PostCardActions from '@/app/PostCardActions'

const PostCard = ({
  post,
  index,
  status,
  setPosts,
  className,
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
        fallbackClassName={status === 'active' || status === 'rejected' ? 'bg-grey-1' : 'bg-white'}
        className="pointer-events-none"
      />
      <PostCardActions
        post={post}
        index={index}
        status={status}
        setPosts={setPosts}
      />
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostCard.defaultProps = {
  className: null,
}

export default PostCard
