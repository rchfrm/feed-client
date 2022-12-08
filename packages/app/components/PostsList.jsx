import React from 'react'
import PropTypes from 'prop-types'
import PostCard from '@/app/PostCard'
import PostCardCreateAdButton from '@/app/PostCardCreateAdButton'

const PostsList = ({ posts, section, action, className }) => {
  if ((!posts || !posts.length)) {
    return 'No posts'
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
            index={index}
            post={post}
            section={section}
            action={action}
            className={[
              'col-span-6 sm:col-span-3 lg:col-span-2',
            ].join(' ')}
          />
        )
      })}
      {section === 'inReview' && (
        <PostCardCreateAdButton
          className="col-span-6 sm:col-span-3 lg:col-span-2"
        />
      )}
    </ul>
  )
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostsList.defaultProps = {
  className: null,
}

export default PostsList
