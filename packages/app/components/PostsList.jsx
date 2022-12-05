import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '@/app/PostCard'

const PostsList = ({ posts, isSmall, className }) => {
  if ((!posts || !posts.length) && !isSmall) {
    return 'No posts'
  }

  return (
    <ul
      className={[
        isSmall ? 'flex' : 'grid grid-cols-12 gap-6 grid-flow-row-dense',
        'transition ease-in-out delay-200 transition-opacity',
        'mb-0',
        className,
      ].join(' ')}
    >
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            className={[
              isSmall ? 'h-10 w-10 rounded-full overflow-hidden mb-0 mr-2' : null,
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
  isSmall: PropTypes.bool,
  className: PropTypes.string,
}

PostsList.defaultProps = {
  isSmall: false,
  className: null,
}

export default PostsList
