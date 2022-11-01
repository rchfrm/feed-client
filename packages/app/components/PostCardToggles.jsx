import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import PostCardToggle from '@/app/PostCardToggle'
import { canBePromoted } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
})

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
  hasSalesObjective,
}) => {
  // Get conversions store values
  const { canRunConversions } = useControlsStore(getControlsStoreState)

  const {
    promotionStatus,
    promotionEnabled,
    promotionEligibility,
    conversionsEnabled,
    isRunningInConversions,
  } = post

  const {
    enticeEngage,
    remindTraffic,
    enticeTraffic,
    offPlatformConversions,
    remindConversions,
  } = promotionEligibility

  const isEligibleForGrowAndNurture = [canBePromoted(enticeEngage), canBePromoted(remindTraffic), canBePromoted(enticeTraffic)].some(Boolean)
  const isEligibleForConversions = [canBePromoted(offPlatformConversions), canBePromoted(remindConversions)].some(Boolean)

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
        campaignType="all"
        artistId={artistId}
        isEnabled={promotionEnabled}
        toggleCampaign={toggleCampaign}
        updatePost={updatePost}
        disabled={!isEligibleForGrowAndNurture && !priorityEnabled}
        isActive={promotionStatus === 'active' && promotionEnabled}
        className={togglesClassName}
        hasSalesObjective={hasSalesObjective}
      />
      {/* CONVERT TOGGLE */}
      {hasSalesObjective && (
        <PostCardToggle
          post={post}
          postToggleSetterType={postToggleSetterType}
          postIndex={postIndex}
          campaignType="conversions"
          artistId={artistId}
          isEnabled={conversionsEnabled}
          toggleCampaign={toggleCampaign}
          disabled={!isEligibleForConversions && !priorityEnabled}
          updatePost={updatePost}
          isActive={isRunningInConversions}
          className={togglesClassName}
          showAlertModal={!canRunConversions}
          hasSalesObjective={hasSalesObjective}
        />
      )}
    </div>
  )
}

PostCardToggles.propTypes = {
  artistId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  postIndex: PropTypes.number,
  toggleCampaign: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
  hasSalesObjective: PropTypes.bool.isRequired,
}

PostCardToggles.defaultProps = {
  togglesClassName: null,
  className: null,
  postIndex: null,
}

export default PostCardToggles
