import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  postId,
  togglesClassName,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* GROWTH TOGGLE */}
      <PostCardToggle
        postId={postId}
        audienceSlug="growth"
        className={togglesClassName}
      />
      {/* CONVERSION TOGGLE */}
      <PostCardToggle
        postId={postId}
        audienceSlug="conversion"
        className={togglesClassName}
      />
    </div>
  )
}

PostCardToggles.propTypes = {
  postId: PropTypes.string.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  togglesClassName: null,
  className: null,
}

export default PostCardToggles
