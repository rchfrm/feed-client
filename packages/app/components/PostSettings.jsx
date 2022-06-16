import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import PostCardSettingsTabs from '@/app/PostCardSettingsTabs'
import PostCardSettingsToggle from '@/app/PostCardSettingsToggle'
import PostCardSettingsPromotionStatus from '@/app/PostCardSettingsPromotionStatus'
import PostCardSettingsPreview from '@/app/PostCardSettingsPreview'
import PostSettingsLink from '@/app/PostSettingsLink'
import PostSettingsCallToAction from '@/app/PostSettingsCallToAction'
import PostSettingsCaption from '@/app/PostSettingsCaption'

import MarkdownText from '@/elements/MarkdownText'

import { promotionStatusSlugs } from '@/app/helpers/postsHelpers'

import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostSettings = ({ post, updatePost }) => {
  const {
    id: postId,
    promotionEnabled,
    conversionsEnabled,
    priorityEnabled,
    promotionEligibility,
    promotionStatus,
    adPreviewLinks,
  } = post

  const [campaignType, setCampaignType] = React.useState('all')
  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

  const { artistId } = React.useContext(ArtistContext)

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

  const isEligibleForGrowAndNurture = [enticeEngage, remindTraffic, enticeTraffic].some(Boolean)
  const isEligibleForConversions = [offPlatformConversions, remindConversions].some(Boolean)

  const isToggleDisabled = campaignType === 'all'
    ? !isEligibleForGrowAndNurture && !priorityEnabled
    : (!isEligibleForConversions && !priorityEnabled)

  const { sales: salesPreviewLink, ...growAndNurturePreviewLinks } = adPreviewLinks || {}
  const hasPreviewLinkForSelectedCampaignType = (campaignType === 'all' && Object.keys(growAndNurturePreviewLinks).length > 0) || (campaignType === 'conversions' && salesPreviewLink)
  const { active, inReview, rejected } = promotionStatusSlugs
  const shouldShowPreview = [active, inReview, rejected].includes(promotionStatus) && hasPreviewLinkForSelectedCampaignType

  // Define function for toggling promotion campaign or conversions campaign
  const toggleCampaign = React.useCallback(async (promotionEnabled, promotableStatus, campaignType = 'all') => {
    updatePost(campaignType === 'all' ? 'toggle-promotion' : 'toggle-conversion',
      {
        promotionEnabled,
        promotableStatus,
      })
  }, [updatePost])

  return (
    <>
      <h2 className="mb-8">Promotion settings</h2>
      <div className="md:pl-16">
        {hasSalesObjective && (
          <PostCardSettingsTabs
            campaignType={campaignType}
            setCampaignType={setCampaignType}
          />
        )}
        {hasSalesObjective && <MarkdownText markdown={copy.postSettingsIntro(campaignType)} />}
        <div className="flex">
          <PostCardSettingsToggle
            post={post}
            postId={postId}
            postToggleSetterType="single"
            campaignType={campaignType}
            toggleCampaign={toggleCampaign}
            artistId={artistId}
            isEnabled={isConversionsCampaign ? isConversionsEnabled : isPromotionEnabled}
            setIsEnabled={isConversionsCampaign ? setIsConversionsEnabled : setIsPromotionEnabled}
            isDisabled={isToggleDisabled}
            showAlertModal={isConversionsCampaign && (!canRunConversions)}
          />
          <PostCardSettingsPromotionStatus
            promotionEnabled={promotionEnabled}
            promotionStatus={promotionStatus}
          />
        </div>
        {shouldShowPreview && (
          <PostCardSettingsPreview
            previewLinks={adPreviewLinks}
            campaignType={campaignType}
          />
        )}
        <PostSettingsLink
          post={post}
          campaignType={campaignType}
          updatePost={updatePost}
        />
        <PostSettingsCallToAction
          post={post}
          campaignType={campaignType}
          updatePost={updatePost}
        />
        <PostSettingsCaption
          post={post}
          campaignType={campaignType}
          updatePost={updatePost}
        />
      </div>
    </>
  )
}

PostSettings.propTypes = {
  post: PropTypes.object,
  updatePost: PropTypes.func.isRequired,
}

PostSettings.defaultProps = {
  post: null,
}

export default PostSettings
