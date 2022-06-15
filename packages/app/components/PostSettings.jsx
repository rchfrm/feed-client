import React from 'react'
import PropTypes from 'prop-types'

import PostSettingsLink from '@/app/PostSettingsLink'
import PostSettingsCallToAction from '@/app/PostSettingsCallToAction'
import PostSettingsCaption from '@/app/PostSettingsCaption'

const PostSettings = ({ post }) => {
  const [campaignType, setCampaignType] = React.useState('all')
  return (
    <>
      <h2 className="mb-8">Promotion settings</h2>
      <div className="md:pl-16">
        <PostSettingsLink
          post={post}
          campaignType={campaignType}
        />
        <PostSettingsCallToAction
          post={post}
          campaignType={campaignType}
        />
        <PostSettingsCaption
          post={post}
          campaignType={campaignType}
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
