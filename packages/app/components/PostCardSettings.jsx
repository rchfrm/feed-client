import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import Button from '@/elements/Button'

import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostCardSettingsLink from '@/app/PostCardSettingsLink'
// eslint-disable-next-line
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import sidePanelStyles from '@/app/SidePanel.module.css'

const PostCardSettings = ({
  post,
  postIndex,
  updateLink,
  isMissingDefaultLink,
  className,
}) => {
  console.log('post', post)
  const {
    promotionStatus,
    linkId,
    linkHref,
    linkType,
  } = post
  const isLinkEditable = promotionStatus !== 'active' && promotionStatus !== 'archived' && linkType !== 'adcreative'
  // HANDLE ERROR
  const [error, setError] = React.useState(null)

  // Go to post settings
  const { goToGlobalPostSettings } = usePostsSidePanel()

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
            copy="Select the link to use for this post, or use the default link."
          >
            <PostCardSettingsLink
              postId={post.id}
              postIndex={postIndex}
              linkId={linkId}
              linkHref={linkHref}
              updateLink={updateLink}
              isLinkEditable={isLinkEditable}
              setError={setError}
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
  updateLink: PropTypes.func.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardSettings.defaultProps = {
  className: null,
}

export default PostCardSettings
