import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import Button from '@/elements/Button'

import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostCardSettingsLink from '@/app/PostCardSettingsLink'
import PostCardEditCaption from '@/app/PostCardEditCaption'
// eslint-disable-next-line
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

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
  } = post
  // HANDLE ERROR
  const [error, setError] = React.useState(null)

  // Go to post settings
  const { goToGlobalPostSettings } = usePostsSidePanel()

  const noCaptionEditExcuse = getCaptionNotEditableExcuse(post)

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
          {/* ERROR */}
          <Error error={error} />
          {/* SETTINGS SECTION */}
          <PostsSettingsSection
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
          </PostsSettingsSection>
          {/* EDIT MESSAGE */}
          <PostsSettingsSection
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
          </PostsSettingsSection>
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
