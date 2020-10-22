import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/PostsPageCopy'

const PostsSettingsLinkTracking = () => {
  return (
    <MarkdownText markdown={copy.linkTrackingExplanation} />
  )
}

PostsSettingsLinkTracking.propTypes = {
}

export default PostsSettingsLinkTracking
