import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import PostSettingsTabs from '@/app/PostSettingsTabs'
import PostSettingsToggle from '@/app/PostSettingsToggle'
import PostSettingsPromotionStatus from '@/app/PostSettingsPromotionStatus'
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
  } = post

  const [campaignType, setCampaignType] = React.useState('all')
  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)
  const [status, setStatus] = React.useState(initialStatus)

  const { artist: { hasGrowthPlan } } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest('sm')

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
      <h2 className="hidden sm:block mb-8">Post settings</h2>
      <div className={className}>
        {hasSalesObjective && (
          <PostSettingsTabs
            campaignType={campaignType}
            setCampaignType={setCampaignType}
            isDisabled={! postPromotable}
          />
        )}
        {isDesktopLayout && (
          <>
            {! postPromotable && (
              <PostUnpromotable className="w-1/2 mb-10" />
            )}
            {hasSalesObjective && <MarkdownText markdown={copy.postSettingsIntro(campaignType)} />}
            <div className="flex">
              <PostSettingsToggle
                post={post}
                postId={postId}
                campaignType={campaignType}
                updatePost={updatePost}
                isEnabled={isConversionsCampaign ? isConversionsEnabled : isPromotionEnabled}
                setIsEnabled={isConversionsCampaign ? setIsConversionsEnabled : setIsPromotionEnabled}
                isDisabled={isToggleDisabled || ! postPromotable}
                className="pl-4"
              />
              <PostSettingsPromotionStatus
                promotionEnabled={promotionEnabled}
                promotionStatus={promotionStatus}
                postPromotable={postPromotable}
                className="pl-4"
              />
            </div>
            {shouldShowPreview && (
              <PostSettingsPreview
                previewLinks={adPreviewLinks}
                campaignType={campaignType}
              />
            )}
          </>
        )}
        <DisabledSection
          section="single-post-page"
          isDisabled={! hasGrowthPlan && ! isSectionDisabled}
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
  className: PropTypes.string,
}

PostSettings.defaultProps = {
  status: '',
  className: null,
}

export default PostSettings
