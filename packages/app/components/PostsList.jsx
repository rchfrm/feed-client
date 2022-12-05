import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '@/app/PostCard'

const PostsList = ({ posts }) => {
  if (!posts || !posts.length) {
    return 'No posts.'
  }

  return (
    <ul
      className={[
        'grid grid-cols-12 gap-6',
        'grid-flow-row-dense mb-0',
      ].join(' ')}
    >
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            className={[
              'col-span-6 sm:col-span-3 lg:col-span-2',
            ].join(' ')}
          />
        )
      })}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
}

PostsList.defaultProps = {
}

export default PostsList
