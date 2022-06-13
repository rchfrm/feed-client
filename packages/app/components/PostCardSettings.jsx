import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Error from '@/elements/Error'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import AdSettingsSection from '@/app/AdSettingsSection'
import PostCardSettingsTabs from '@/app/PostCardSettingsTabs'
import PostCardSettingsToggle from '@/app/PostCardSettingsToggle'
import PostCardSettingsPromotionStatus from '@/app/PostCardSettingsPromotionStatus'
import PostCardSettingsPreview from '@/app/PostCardSettingsPreview'
import PostCardSettingsLink from '@/app/PostCardSettingsLink'
import PostCardSettingsCallToAction from '@/app/PostCardSettingsCallToAction'
import PostCardEditCaption from '@/app/PostCardEditCaption'

import * as ROUTES from '@/app/constants/routes'
import { promotionStatusSlugs } from '@/app/helpers/postsHelpers'

import sidePanelStyles from '@/SidePanel.module.css'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
  conversionsEnabled: state.conversionsEnabled,
  optimizationPreferences: state.optimizationPreferences,
})

const getCaptionNotEditableExcuse = (post) => {
  const base = 'The caption is not editable because'
  if (post.postType === 'story') return `${base} this is a story.`
  if (!post.postPromotable) return `${base} the post is not promotable.`
  return ''
}

const PostCardSettings = ({
  post,
  postIndex,
  postToggleSetterType,
  updatePost,
  artistId,
  toggleCampaign,
  isMissingDefaultLink,
  className,
}) => {
  const {
    promotionEnabled,
    conversionsEnabled,
    promotionStatus,
    promotionEligibility,
    linkSpecs,
    adMessages,
    callToActions,
    id: postId,
    priorityEnabled,
    adPreviewLinks,
  } = post
  // HANDLE ERROR
  const [error, setError] = React.useState(null)
  const [campaignType, setCampaignType] = React.useState('all')

  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

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
  const isSectionDisabled = campaignType === 'all' ? !isPromotionEnabled : !isConversionsEnabled

  const noCaptionEditExcuse = getCaptionNotEditableExcuse(post)

  const goToGlobalPostSettings = () => {
    Router.push(ROUTES.CONTROLS_ADS)
  }

  const { sales: salesPreviewLink, ...growAndNurturePreviewLinks } = adPreviewLinks || {}
  const hasPreviewLinkForSelectedCampaignType = (campaignType === 'all' && Object.keys(growAndNurturePreviewLinks).length > 0) || (campaignType === 'conversions' && salesPreviewLink)
  const { active, inReview, rejected } = promotionStatusSlugs
  const shouldShowPreview = [active, inReview, rejected].includes(promotionStatus) && hasPreviewLinkForSelectedCampaignType

  return (
    <div>
      {/* HEADER */}
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      <div className={className}>
        {/* STOP HERE IF NO DEFAULT LINK IS SET */}
        {isMissingDefaultLink ? (
          <div className="bg-grey-1 px-5 py-4 rounded-dialogue">
            <p>Before you can run any post as an ad, you must first select a default link in the global post settings.</p>
            <Button
              onClick={goToGlobalPostSettings}
              version="green x-small"
              trackComponentName="PostCardSettings"
            >
              Go to Global Post Settings
            </Button>
          </div>
        ) : (
          <>
            {/* CAMPAIGN TYPE TABS */}
            {hasSalesObjective && (
              <PostCardSettingsTabs
                campaignType={campaignType}
                setCampaignType={setCampaignType}
              />
            )}
            {/* ERROR */}
            <Error error={error} />
            {/* SETTINGS SECTION */}
            {hasSalesObjective && <MarkdownText markdown={copy.postSettingsIntro(campaignType)} />}
            <div className="flex">
              <PostCardSettingsToggle
                post={post}
                postId={postId}
                postToggleSetterType={postToggleSetterType}
                campaignType={campaignType}
                artistId={artistId}
                toggleCampaign={toggleCampaign}
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
            <AdSettingsSection
              header="Link"
              copy={copy.postLinkSetting}
              isDisabled={isSectionDisabled}
            >
              <PostCardSettingsLink
                postId={post.id}
                postIndex={postIndex}
                updatePost={updatePost}
                postPromotionStatus={promotionStatus}
                setError={setError}
                linkSpecs={linkSpecs}
                campaignType={campaignType}
                isDisabled={isSectionDisabled}
              />
            </AdSettingsSection>
            <AdSettingsSection
              header="Call to Action"
              copy={copy.postCallToActionSetting}
              isDisabled={isSectionDisabled}
            >
              <PostCardSettingsCallToAction
                postId={post.id}
                postIndex={postIndex}
                postCallToActions={callToActions}
                artistId={artistId}
                updatePost={updatePost}
                campaignType={campaignType}
                postPromotionStatus={promotionStatus}
                isDisabled={isSectionDisabled}
              />
            </AdSettingsSection>
            {/* EDIT MESSAGE */}
            <AdSettingsSection
              header="Caption"
              copy={noCaptionEditExcuse || copy.editCaption}
              copyClassName={noCaptionEditExcuse && 'text-red'}
              isDisabled={isSectionDisabled}
            >
              <PostCardEditCaption
                post={post}
                postIndex={postIndex}
                postAdMessages={adMessages}
                updatePost={updatePost}
                isEditable={!noCaptionEditExcuse}
                campaignType={campaignType}
                isDisabled={isSectionDisabled}
              />
            </AdSettingsSection>
          </>
        )}
      </div>
    </div>
  )
}

PostCardSettings.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  updatePost: PropTypes.func,
  artistId: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func,
  isMissingDefaultLink: PropTypes.bool,
  className: PropTypes.string,
}

PostCardSettings.defaultProps = {
  updatePost: () => {},
  toggleCampaign: () => {},
  isMissingDefaultLink: false,
  className: null,
}

export default PostCardSettings
