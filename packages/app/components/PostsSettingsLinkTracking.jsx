import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/PostsPageCopy'

const PostsSettingsLinkTracking = ({ defaultLink }) => {
  const { href: defaultLinkHref = '' } = defaultLink
  return (
    <MarkdownText markdown={copy.linkTrackingExplanation(defaultLinkHref.replace('https://', ''))} />
  )
}

PostsSettingsLinkTracking.propTypes = {
  defaultLink: PropTypes.object,
}

PostsSettingsLinkTracking.defaultProps = {
  defaultLink: {},
}


export default PostsSettingsLinkTracking
