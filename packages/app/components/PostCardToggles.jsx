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
  promotionStatus,
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
        isActive={promotionStatus === 'active'}
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
          isActive={false}
          className={togglesClassName}
        />
      )}
    </div>
  )
}

PostCardToggles.propTypes = {
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  growthDisabled: PropTypes.bool,
  conversionVisible: PropTypes.bool,
  conversionDisabled: PropTypes.bool.isRequired,
  promotionEnabled: PropTypes.bool,
  promotionStatus: PropTypes.string.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  growthDisabled: false,
  promotionEnabled: false,
  conversionVisible: false,
  togglesClassName: null,
  className: null,
}

export default PostCardToggles
