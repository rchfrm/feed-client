import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '@/app/PostCard'
import PostStatus from '@/app/PostStatus'
import PostsNone from '@/app/PostsNone'
import PostCardCreateAdButton from '@/app/PostCardCreateAdButton'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const PostsList = ({
  posts,
  status,
  setPosts,
  filterBy,
  sortBy,
  setIsPostActionsOpen,
  isSpendingPaused,
  setStatusToRefresh,
  className,
}) => {
  const isLastPromotableNotRunPost = ! isSpendingPaused && status === 'pending' && posts.length === 1
  const { artist } = React.useContext(ArtistContext)
  const isCustomAdFeatureEnabled = Boolean(artist.feature_flags.custom_ads_enabled)
  const isActiveOrPending = status === 'active' || status === 'pending'
  const showCreateAdButton = isCustomAdFeatureEnabled && isActiveOrPending && ! posts.length
  return (
    <ul
      className={[
        'grid grid-cols-12 gap-6 grid-flow-row-dense',
        'mb-0',
        className,
      ].join(' ')}
    >
      {showCreateAdButton && <PostCardCreateAdButton setStatusToRefresh={setStatusToRefresh} className="col-span-6 sm:col-span-3 lg:col-span-2" />}
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
                sortBy={sortBy}
                setIsPostActionsOpen={setIsPostActionsOpen}
                isLastPromotableNotRunPost={isLastPromotableNotRunPost}
                setStatusToRefresh={setStatusToRefresh}
              />
              <PostStatus post={post} status={status} />
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
  sortBy: PropTypes.string.isRequired,
  setIsPostActionsOpen: PropTypes.func.isRequired,
  isSpendingPaused: PropTypes.bool.isRequired,
  setStatusToRefresh: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsList.defaultProps = {
  className: null,
}

export default PostsList
