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
    postType,
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

  const isEligibleForGrowAndNurture = [canBePromoted(enticeEngage, postType), canBePromoted(remindTraffic, postType), canBePromoted(enticeTraffic, postType)].some(Boolean)
  const isEligibleForConversions = [canBePromoted(offPlatformConversions, postType), canBePromoted(remindConversions, postType)].some(Boolean)

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
