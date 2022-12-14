import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import PostContentToggle from '@/app/PostContentToggle'
import { canBePromoted } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
})

const PostContentToggles = ({
  post,
  setPost,
  priorityEnabled,
  togglesClassName,
  className,
  hasSalesObjective,
}) => {
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
      <PostContentToggle
        campaignType="all"
        post={post}
        setPost={setPost}
        isEnabled={promotionEnabled}
        disabled={! isEligibleForGrowAndNurture && ! priorityEnabled}
        isActive={promotionStatus === 'active' && promotionEnabled}
        className={togglesClassName}
        hasSalesObjective={hasSalesObjective}
      />
      {/* CONVERT TOGGLE */}
      {hasSalesObjective && (
        <PostContentToggle
          campaignType="conversions"
          post={post}
          setPost={setPost}
          isEnabled={conversionsEnabled}
          disabled={! isEligibleForConversions && ! priorityEnabled}
          isActive={isRunningInConversions}
          className={togglesClassName}
          showAlertModal={! canRunConversions}
          hasSalesObjective={hasSalesObjective}
        />
      )}
    </div>
  )
}

PostContentToggles.propTypes = {
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  togglesClassName: PropTypes.string,
  className: PropTypes.string,
  hasSalesObjective: PropTypes.bool.isRequired,
}

PostContentToggles.defaultProps = {
  togglesClassName: null,
  className: null,
}

export default PostContentToggles
