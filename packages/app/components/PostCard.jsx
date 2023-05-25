import React from 'react'
import PropTypes from 'prop-types'
import PostCardMedia from '@/app/PostCardMedia'
import PostCardActions from '@/app/PostCardActions'

const PostCard = ({
  post,
  index,
  status,
  setPosts,
  sortBy,
  setIsPostActionsOpen,
  isLastPromotableNotRunPost,
  setStatusToRefresh,
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
        fallbackClassName={status === 'active' || status === 'rejected' ? 'bg-grey-light' : 'bg-white'}
        className="pointer-events-none"
      />
      <PostCardActions
        post={post}
        index={index}
        status={status}
        setPosts={setPosts}
        sortBy={sortBy}
        setIsPostActionsOpen={setIsPostActionsOpen}
        isLastPromotableNotRunPost={isLastPromotableNotRunPost}
        setStatusToRefresh={setStatusToRefresh}
      />
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  sortBy: PropTypes.array.isRequired,
  setIsPostActionsOpen: PropTypes.func.isRequired,
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
  setStatusToRefresh: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostCard.defaultProps = {
  className: null,
}

export default PostCard
