import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Error from '@/elements/Error'
import Button from '@/elements/Button'

import AdSettingsSection from '@/app/AdSettingsSection'
import PostCardSettingsLink from '@/app/PostCardSettingsLink'
import PostCardSettingsCallToAction from '@/app/PostCardSettingsCallToAction'
import PostCardEditCaption from '@/app/PostCardEditCaption'

import * as ROUTES from '@/app/constants/routes'

import { campaignTypes, growthGradient, conversionsGradient } from '@/app/helpers/postsHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

import copy from '@/app/copy/PostsPageCopy'

const getCaptionNotEditableExcuse = (post) => {
  const base = 'The caption is not editable because'
  if (post.postType === 'story') return `${base} this is a story.`
  if (!post.postPromotable) return `${base} the post is not promotable.`
  return ''
}

const PostCardSettings = ({
  post,
  postIndex,
  updatePost,
  isMissingDefaultLink,
  className,
}) => {
  const {
    promotionStatus,
    linkId,
    linkHref,
    linkType,
    callToActions,
  } = post
  // HANDLE ERROR
  const [error, setError] = React.useState(null)
  const [currentView, setCurrentView] = React.useState('all')

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
      {/* CAMPAIGN TYPE TABS */}
      <div className="flex mb-6 text-lg text-grey-3">
        {campaignTypes.map(({ title, slug }) => {
          const isActive = currentView === slug
          return (
            <div
              key={slug}
              className={[
                'flex items-center',
                'mr-5',
                isActive ? 'text-black border-solid border-black border-b-2' : '',
              ].join(' ')}
            >
              <span
                className="w-4 h-4 rounded-full mr-1"
                style={{
                  background: slug === 'all' ? growthGradient : conversionsGradient,
                }}
              />
              <button
                type="button"
                className={[
                  isActive ? 'font-bold' : '',
                ].join(' ')}
                onClick={() => setCurrentView(slug)}
              >
                {title}
              </button>
            </div>
          )
        })}
      </div>
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
          {/* ERROR */}
          <Error error={error} />
          {/* SETTINGS SECTION */}
          <AdSettingsSection
            header="Link"
            copy={copy.postLinkSetting}
          >
            <PostCardSettingsLink
              postId={post.id}
              postIndex={postIndex}
              linkId={linkId}
              linkHref={linkHref}
              updatePost={updatePost}
              postPromotionStatus={promotionStatus}
              linkType={linkType}
              setError={setError}
            />
          </AdSettingsSection>
          <AdSettingsSection
            header="Call to Action"
            copy={copy.postCallToActionSetting}
          >
            <PostCardSettingsCallToAction
              postId={post.id}
              postIndex={postIndex}
              postCallToActions={callToActions}
              updatePost={updatePost}
              campaignType={currentView}
            />
          </AdSettingsSection>
          {/* EDIT MESSAGE */}
          <AdSettingsSection
            header="Caption"
            copy={noCaptionEditExcuse || copy.editCaption}
            copyClassName={noCaptionEditExcuse && 'text-red'}
          >
            <PostCardEditCaption
              post={post}
              postIndex={postIndex}
              updatePost={updatePost}
              isEditable={!noCaptionEditExcuse}
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
  updatePost: PropTypes.func.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardSettings.defaultProps = {
  className: null,
}

export default PostCardSettings
