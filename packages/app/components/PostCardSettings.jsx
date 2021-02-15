import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostCardSettingsLink from '@/app/PostCardSettingsLink'

import sidePanelStyles from '@/app/SidePanel.module.css'

const PostCardSettings = ({
  post,
  postIndex,
  updateLink,
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
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* HEADER */}
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
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
    </div>
  )
}

PostCardSettings.propTypes = {
  className: PropTypes.string,
}

PostCardSettings.defaultProps = {
  className: null,
}

export default PostCardSettings
