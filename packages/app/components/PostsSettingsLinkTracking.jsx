import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/PostsPageCopy'

const PostsSettingsLinkTracking = ({ defaultLink }) => {
  console.log('defaultLink', defaultLink)
  return (
    <MarkdownText markdown={copy.linkTrackingExplanation(defaultLink.href)} />
  )
}

PostsSettingsLinkTracking.propTypes = {
  defaultLink: PropTypes.object,
}

PostsSettingsLinkTracking.defaultProps = {
  defaultLink: {},
}


export default PostsSettingsLinkTracking
