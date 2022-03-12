import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  artistId,
  post,
  postToggleSetterType,
  postIndex,
  toggleCampaign,
  updatePost,
  priorityEnabled,
  togglesClassName,
  className,
}) => {
  const {
    promotionStatus,
    promotionEnabled,
    promotionEligibility,
  } = post

  const {
    enticeEngage,
    remindTraffic,
    enticeTraffic,
    offPlatformConversions,
    remindConversions,
  } = promotionEligibility

  const isEligibleForGrowAndNurture = [enticeEngage, remindTraffic, enticeTraffic].some(Boolean)
  const isEligibleForConversions = [offPlatformConversions, remindConversions].some(Boolean)

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* GROWTH TOGGLE */}
      <PostCardToggle
        post={post}
        postToggleSetterType={postToggleSetterType}
        postIndex={postIndex}
        artistId={artistId}
        isEnabled={promotionEnabled}
        toggleCampaign={toggleCampaign}
        updatePost={updatePost}
        disabled={(!isEligibleForGrowAndNurture && !isEligibleForConversions) && !priorityEnabled}
        isActive={promotionStatus === 'active' && promotionEnabled}
        className={togglesClassName}
      />
    </div>
  )
}

PostCardToggles.propTypes = {
  artistId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  togglesClassName: null,
  className: null,
}

export default PostCardToggles
