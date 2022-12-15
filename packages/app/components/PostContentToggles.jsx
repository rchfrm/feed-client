import React from 'react'
import PropTypes from 'prop-types'
import PostContentToggle from '@/app/PostContentToggle'
import { canBePromoted } from '@/app/helpers/postsHelpers'

const PostContentToggles = ({
  post,
  setPost,
  priorityEnabled,
  className,
  hasSalesObjective,
}) => {
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

  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

  const isEligibleForGrowAndNurture = [canBePromoted(enticeEngage), canBePromoted(remindTraffic), canBePromoted(enticeTraffic)].some(Boolean)
  const isEligibleForConversions = [canBePromoted(offPlatformConversions), canBePromoted(remindConversions)].some(Boolean)

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostContentToggle
        campaignType="all"
        post={post}
        setPost={setPost}
        isEnabled={isPromotionEnabled}
        setIsEnabled={setIsPromotionEnabled}
        disabled={! isEligibleForGrowAndNurture && ! priorityEnabled}
        isActive={promotionStatus === 'active' && promotionEnabled}
        hasSalesObjective={hasSalesObjective}
      />
      {hasSalesObjective && (
        <PostContentToggle
          campaignType="conversions"
          post={post}
          setPost={setPost}
          isEnabled={isConversionsEnabled}
          setIsEnabled={setIsConversionsEnabled}
          disabled={! isEligibleForConversions && ! priorityEnabled}
          isActive={isRunningInConversions}
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
  className: PropTypes.string,
  hasSalesObjective: PropTypes.bool.isRequired,
}

PostContentToggles.defaultProps = {
  className: null,
}

export default PostContentToggles
