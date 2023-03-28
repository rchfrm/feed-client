import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '@/app/PostCard'
import PostRejectedReason from '@/app/PostRejectedReason'
import PostsNone from '@/app/PostsNone'

const PostsList = ({
  posts,
  status,
  setPosts,
  filterBy,
  setIsPostActionsOpen,
  isSpendingPaused,
  className,
}) => {
  const isLastPromotableNotRunPost = ! isSpendingPaused && status === 'pending' && posts.length === 1

  return (
    <ul
      className={[
        'grid grid-cols-12 gap-6 grid-flow-row-dense',
        'mb-0',
        className,
      ].join(' ')}
    >
      {! posts.length ? (
        <PostsNone filterBy={filterBy} className="col-span-12" />
      ) : (
        posts.map((post, index) => {
          return (
            <div
              key={post.id}
              className="col-span-6 sm:col-span-3 lg:col-span-2"
            >
              <PostCard
                key={post.id}
                post={post}
                index={index}
                status={status}
                setPosts={setPosts}
                setIsPostActionsOpen={setIsPostActionsOpen}
                isLastPromotableNotRunPost={isLastPromotableNotRunPost}
              />
              {status === 'rejected' && (
                <PostRejectedReason post={post} />
              )}
            </div>
          )
        })
      )}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  filterBy: PropTypes.object.isRequired,
  setIsPostActionsOpen: PropTypes.func.isRequired,
  isSpendingPaused: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsList.defaultProps = {
  className: null,
}

export default PostsList
