import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Error from '@/elements/Error'
import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import AdSettingsSection from '@/app/AdSettingsSection'
import PostCardSettingsTabs from '@/app/PostCardSettingsTabs'
import PostCardSettingsToggle from '@/app/PostCardSettingsToggle'
import PostCardSettingsLink from '@/app/PostCardSettingsLink'
import PostCardSettingsCallToAction from '@/app/PostCardSettingsCallToAction'
import PostCardEditCaption from '@/app/PostCardEditCaption'

import * as ROUTES from '@/app/constants/routes'

import sidePanelStyles from '@/app/SidePanel.module.css'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/PostsPageCopy'

const getControlsStoreState = (state) => ({
  canRunConversions: state.canRunConversions,
  conversionsEnabled: state.conversionsEnabled,
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
    linkSpecs,
    callToActions,
    id: postId,
    priorityEnabled,
  } = post
  // Get conversions feature flag value
  const { featureFlags: { conversionsEnabled: conversionsFeatureEnabled } } = React.useContext(ArtistContext)
  // HANDLE ERROR
  const [error, setError] = React.useState(null)
  const [campaignType, setCampaignType] = React.useState('all')

  const [isPromotionEnabled, setIsPromotionEnabled] = React.useState(promotionEnabled)
  const [isConversionsEnabled, setIsConversionsEnabled] = React.useState(conversionsEnabled)

  const { canRunConversions, conversionsEnabled: globalConversionsEnabled } = useControlsStore(getControlsStoreState)
  const isConversionsCampaign = campaignType === 'conversions'

  const isPostArchivedAndNotPrioritized = promotionStatus === 'archived' && !priorityEnabled
  const isToggleDisabled = campaignType === 'all'
    ? isPostArchivedAndNotPrioritized
    : isPostArchivedAndNotPrioritized || !globalConversionsEnabled || !canRunConversions
  const isSectionDisabled = campaignType === 'all'
    ? !isPromotionEnabled
    : !isConversionsEnabled || !globalConversionsEnabled || !canRunConversions

  const noCaptionEditExcuse = getCaptionNotEditableExcuse(post)

  const goToGlobalPostSettings = () => {
    Router.push(ROUTES.CONTROLS_ADS)
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* HEADER */}
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      {/* STOP HERE IF NO DEFAULT LINK IS SET */}
      {isMissingDefaultLink ? (
        <div className="bg-grey-1 px-5 py-4 rounded-dialogue">
          <p>Before you can run any post as an ad, you must first select a default link in the global post settings.</p>
          <Button
            onClick={goToGlobalPostSettings}
            version="green x-small"
          >
            Go to Global Post Settings
          </Button>
        </div>
      ) : (
        <>
          {/* CAMPAIGN TYPE TABS */}
          {conversionsFeatureEnabled && (
            <PostCardSettingsTabs
              campaignType={campaignType}
              setCampaignType={setCampaignType}
            />
          )}
          {/* ERROR */}
          <Error error={error} />
          {/* SETTINGS SECTION */}
          <MarkdownText markdown={copy.postSettingsIntro(campaignType)} />
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
          />
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
              updatePost={updatePost}
              isEditable={!noCaptionEditExcuse}
              campaignType={campaignType}
              isDisabled={isSectionDisabled}
            />
          </AdSettingsSection>
        </>
      )}
    </div>
  )
}

PostCardSettings.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  artistId: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardSettings.defaultProps = {
  className: null,
}

export default PostCardSettings
