import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  postId,
  conversionVisible,
  conversionDisabled,
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
      {conversionVisible && (
        <PostCardToggle
          postId={postId}
          audienceSlug="conversion"
          className={togglesClassName}
          disabled={conversionDisabled}
        />
      )}
    </div>
  )
}

PostCardToggles.propTypes = {
  postId: PropTypes.string.isRequired,
  conversionVisible: PropTypes.bool,
  conversionDisabled: PropTypes.bool.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  conversionVisible: false,
  togglesClassName: null,
  className: null,
}

export default PostCardToggles
