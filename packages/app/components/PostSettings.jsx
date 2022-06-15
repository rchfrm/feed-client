import React from 'react'
import PropTypes from 'prop-types'

import PostSettingsLink from '@/app/PostSettingsLink'
import PostSettingsCallToAction from '@/app/PostSettingsCallToAction'

const PostSettings = ({ post }) => {
  return (
    <>
      <h2 className="mb-8">Promotion settings</h2>
      <div className="md:pl-16">
        <PostSettingsLink
          post={post}
          campaignType="all"
        />
        <PostSettingsCallToAction
          post={post}
          campaignType="all"
        />
      </div>
    </>
  )
}

PostSettings.propTypes = {
  post: PropTypes.object,
}

PostSettings.defaultProps = {
  post: null,
}

export default PostSettings
