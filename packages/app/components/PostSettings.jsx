import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import PostSettingsTabs from '@/app/PostSettingsTabs'
import PostSettingsToggle from '@/app/PostSettingsToggle'
import PostSettingsPromotionStatus from '@/app/PostSettingsPromotionStatus'
import PostSettingsScore from '@/app/PostSettingsScore'
import PostSettingsPreview from '@/app/PostSettingsPreview'
import PostSettingsLink from '@/app/PostSettingsLink'
import PostSettingsCallToAction from '@/app/PostSettingsCallToAction'
import PostSettingsCaption from '@/app/PostSettingsCaption'
import PostUnpromotable from '@/app/PostUnpromotable'
import DisabledSection from '@/app/DisabledSection'
import MarkdownText from '@/elements/MarkdownText'
import { promotionStatusSlugs, canBePromoted } from '@/app/helpers/postsHelpers'
import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettings = ({
  post,
  status: initialStatus,
  setPost,
  isLastPromotableNotRunPost,
  className,
}) => {
  const {
    id: postId,
    promotionEnabled,
    postPromotable,
    conversionsEnabled,
    priorityEnabled,
    promotionEligibility,
    promotionStatus,
    adPreviewLinks,
    postType,
    normalizedScore,
  } = post

  const [campaignType, setCampaignType] = React.useState('all')
  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)
  const [status, setStatus] = React.useState(initialStatus)

  const { artist: { hasBasicPlan } } = React.useContext(ArtistContext)
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const isConversionsCampaign = campaignType === 'conversions'

  const {
    enticeEngage,
    remindTraffic,
    enticeTraffic,
    offPlatformConversions,
    remindConversions,
  } = promotionEligibility

  const isEligibleForGrowAndNurture = [canBePromoted(enticeEngage, postType), canBePromoted(remindTraffic, postType), canBePromoted(enticeTraffic, postType)].some(Boolean)
  const isEligibleForConversions = [canBePromoted(offPlatformConversions, postType), canBePromoted(remindConversions, postType)].some(Boolean)

  const isToggleDisabled = campaignType === 'all'
    ? ! isEligibleForGrowAndNurture && ! priorityEnabled
    : (! isEligibleForConversions && ! priorityEnabled)
  const isSectionDisabled = campaignType === 'all' ? ! isPromotionEnabled : ! isConversionsEnabled

  const { sales: salesPreviewLink, ...growAndNurturePreviewLinks } = adPreviewLinks || {}
  const hasPreviewLinkForSelectedCampaignType = (campaignType === 'all' && Object.keys(growAndNurturePreviewLinks).length > 0) || (campaignType === 'conversions' && salesPreviewLink)
  const { active, inReview, rejected } = promotionStatusSlugs
  const shouldShowPreview = [active, inReview, rejected].includes(promotionStatus) && hasPreviewLinkForSelectedCampaignType

  const updatePost = ({ type, payload }) => {
    setStatus((status) => payload.newStatus || status)

    setPost({
      type,
      payload: {
        status: payload.status || status,
        ...payload,
      },
    })
  }

  return (
    <div>
      <h2 className="block mb-8">Post settings</h2>
      <div className={className}>
        {hasSalesObjective && (
          <PostSettingsTabs
            campaignType={campaignType}
            setCampaignType={setCampaignType}
            isDisabled={! postPromotable}
          />
        )}
        {! postPromotable && (
          <PostUnpromotable className="w-full max-w-xs mb-10" />
        )}
        {hasSalesObjective && <MarkdownText markdown={copy.postSettingsIntro(campaignType)} />}
        <div className="flex flex-wrap">
          <PostSettingsToggle
            post={post}
            postId={postId}
            campaignType={campaignType}
            updatePost={updatePost}
            isEnabled={isConversionsCampaign ? isConversionsEnabled : isPromotionEnabled}
            setIsEnabled={isConversionsCampaign ? setIsConversionsEnabled : setIsPromotionEnabled}
            isDisabled={isToggleDisabled || ! postPromotable}
            isLastPromotableNotRunPost={isLastPromotableNotRunPost}
          />
          <PostSettingsPromotionStatus
            promotionEnabled={promotionEnabled}
            promotionStatus={promotionStatus}
            postPromotable={postPromotable}
          />
          <PostSettingsScore
            score={normalizedScore}
          />
        </div>
        {shouldShowPreview && (
          <PostSettingsPreview
            previewLinks={adPreviewLinks}
            campaignType={campaignType}
          />
        )}
        <DisabledSection
          section="single-post-page"
          isDisabled={hasBasicPlan && ! isSectionDisabled}
          className="brightness-100"
        >
          <PostSettingsLink
            post={post}
            campaignType={campaignType}
            updatePost={updatePost}
            isDisabled={isSectionDisabled}
          />
          <PostSettingsCallToAction
            post={post}
            campaignType={campaignType}
            updatePost={updatePost}
            isDisabled={isSectionDisabled}
          />
          <PostSettingsCaption
            post={post}
            campaignType={campaignType}
            updatePost={updatePost}
            isDisabled={isSectionDisabled}
          />
        </DisabledSection>
      </div>
    </div>
  )
}

PostSettings.propTypes = {
  post: PropTypes.object.isRequired,
  status: PropTypes.string,
  setPost: PropTypes.func.isRequired,
  isLastPromotableNotRunPost: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostSettings.defaultProps = {
  status: '',
  className: null,
}

export default PostSettings
