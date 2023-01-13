import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import PostCardSettingsTabs from '@/app/PostCardSettingsTabs'
import PostCardSettingsToggle from '@/app/PostCardSettingsToggle'
import PostCardSettingsPromotionStatus from '@/app/PostCardSettingsPromotionStatus'
import PostCardSettingsPreview from '@/app/PostCardSettingsPreview'
import PostSettingsLink from '@/app/PostSettingsLink'
import PostSettingsCallToAction from '@/app/PostSettingsCallToAction'
import PostSettingsCaption from '@/app/PostSettingsCaption'
import PostUnpromotable from '@/app/PostUnpromotable'
import DisabledSection from '@/app/DisabledSection'

import MarkdownText from '@/elements/MarkdownText'

import { promotionStatusSlugs, canBePromoted } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettings = ({ post, updatePost, toggleCampaign }) => {
  const {
    id: postId,
    promotionEnabled,
    postPromotable,
    conversionsEnabled,
    priorityEnabled,
    promotionEligibility,
    promotionStatus,
    adPreviewLinks,
  } = post

  const [campaignType, setCampaignType] = React.useState('all')
  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

  const { artistId, artist: { hasGrowthPlan } } = React.useContext(ArtistContext)
  const isDesktopLayout = useBreakpointTest('sm')

  const { canRunConversions, optimizationPreferences } = useControlsStore(getControlsStoreState)
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

  const isEligibleForGrowAndNurture = [canBePromoted(enticeEngage), canBePromoted(remindTraffic), canBePromoted(enticeTraffic)].some(Boolean)
  const isEligibleForConversions = [canBePromoted(offPlatformConversions), canBePromoted(remindConversions)].some(Boolean)

  const isToggleDisabled = campaignType === 'all'
    ? ! isEligibleForGrowAndNurture && ! priorityEnabled
    : (! isEligibleForConversions && ! priorityEnabled)
  const isSectionDisabled = (campaignType === 'all' ? ! isPromotionEnabled : ! isConversionsEnabled) || ! postPromotable

  const { sales: salesPreviewLink, ...growAndNurturePreviewLinks } = adPreviewLinks || {}
  const hasPreviewLinkForSelectedCampaignType = (campaignType === 'all' && Object.keys(growAndNurturePreviewLinks).length > 0) || (campaignType === 'conversions' && salesPreviewLink)
  const { active, inReview, rejected } = promotionStatusSlugs
  const shouldShowPreview = [active, inReview, rejected].includes(promotionStatus) && hasPreviewLinkForSelectedCampaignType

  React.useEffect(() => {
    if (isConversionsCampaign) {
      setIsConversionsEnabled(conversionsEnabled)
    } else {
      setIsPromotionEnabled(promotionEnabled)
    }
  }, [isConversionsCampaign, promotionEnabled, conversionsEnabled])

  return (
    <>
      <h2 className="hidden sm:block mb-8">Promotion settings</h2>
      <div className="md:pl-16">
        {hasSalesObjective && (
          <PostCardSettingsTabs
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
              <PostCardSettingsToggle
                post={post}
                postId={postId}
                campaignType={campaignType}
                toggleCampaign={toggleCampaign}
                artistId={artistId}
                isEnabled={isConversionsCampaign ? isConversionsEnabled : isPromotionEnabled}
                setIsEnabled={isConversionsCampaign ? setIsConversionsEnabled : setIsPromotionEnabled}
                isDisabled={isToggleDisabled || ! postPromotable}
                showAlertModal={isConversionsCampaign && (! canRunConversions)}
                className="pl-4"
              />
              <PostCardSettingsPromotionStatus
                promotionEnabled={promotionEnabled}
                promotionStatus={promotionStatus}
                postPromotable={postPromotable}
                className="pl-4"
              />
            </div>
            {shouldShowPreview && (
              <PostCardSettingsPreview
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
    </>
  )
}

PostSettings.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
}

PostSettings.defaultProps = {
}

export default PostSettings
