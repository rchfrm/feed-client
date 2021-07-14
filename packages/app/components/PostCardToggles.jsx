import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  postId,
  artistId,
  growthDisabled,
  conversionsDisabled,
  conversionsFeatureEnabled,
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
        audienceSlug="conversion"
        postId={postId}
        artistId={artistId}
        promotionEnabled={false}
        togglePromotion={togglePromotion}
        disabled={conversionsDisabled}
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
  conversionsDisabled: PropTypes.bool.isRequired,
  conversionsFeatureEnabled: PropTypes.bool.isRequired,
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
