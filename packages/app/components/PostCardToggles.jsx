import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  postId,
  artistId,
  growthDisabled,
  conversionsFeatureEnabled,
  conversionsToggleDisabled,
  conversionsEnabled,
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
      <PostCardToggle
        audienceSlug="earn"
        postId={postId}
        artistId={artistId}
        promotionEnabled={conversionsEnabled}
        togglePromotion={togglePromotion}
        disabled={conversionsToggleDisabled}
        isFeatureEnabled={conversionsFeatureEnabled}
        isActive={false}
        className={togglesClassName}
      />
    </div>
  )
}

PostCardToggles.propTypes = {
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  growthDisabled: PropTypes.bool,
  conversionsToggleDisabled: PropTypes.bool.isRequired,
  conversionsFeatureEnabled: PropTypes.bool.isRequired,
  conversionsEnabled: PropTypes.bool.isRequired,
  promotionEnabled: PropTypes.bool,
  promotionStatus: PropTypes.string.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  growthDisabled: false,
  promotionEnabled: false,
  togglesClassName: null,
  className: null,
}

export default PostCardToggles
