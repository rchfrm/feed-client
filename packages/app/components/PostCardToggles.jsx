import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  postId,
  artistId,
  growthDisabled,
  conversionVisible,
  conversionDisabled,
  promotionEnabled,
  togglePromotion,
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
        audienceSlug="growth"
        postId={postId}
        artistId={artistId}
        promotionEnabled={promotionEnabled}
        togglePromotion={togglePromotion}
        disabled={growthDisabled}
        className={togglesClassName}
      />
      {/* CONVERSION TOGGLE */}
      {conversionVisible && (
        <PostCardToggle
          audienceSlug="conversion"
          postId={postId}
          artistId={artistId}
          promotionEnabled={false}
          togglePromotion={togglePromotion}
          disabled={conversionDisabled}
          className={togglesClassName}
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
