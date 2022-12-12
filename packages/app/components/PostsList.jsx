import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '@/app/PostCard'
import PostsNone from '@/app/PostsNone'
import PostCardCreateAdButton from '@/app/PostCardCreateAdButton'

const PostsList = ({
  posts,
  status,
  setPosts,
  filterBy,
  className,
}) => {
  if (! posts.length) {
    return (
      <PostsNone
        filterBy={filterBy}
      />
    )
  }

  return (
    <ul
      className={[
        'grid grid-cols-12 gap-6 grid-flow-row-dense',
        'mb-0',
        className,
      ].join(' ')}
    >
      {posts.map((post, index) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            status={status}
            setPosts={setPosts}
            className={[
              'col-span-6 sm:col-span-3 lg:col-span-2',
            ].join(' ')}
          />
        )
      })}
      {status === 'pending' && (
        <PostCardCreateAdButton
          className="col-span-6 sm:col-span-3 lg:col-span-2"
        />
      )}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsList.defaultProps = {
  className: null,
}

export default PostsList
