import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { removeProtocolFromUrl } from '@/helpers/utils'

import copy from '@/app/copy/controlsPageCopy'

const PostsSettingsLinkTracking = ({ defaultLink }) => {
  const { href: defaultLinkHref = '' } = defaultLink
  const previewLink = defaultLinkHref ? removeProtocolFromUrl(defaultLinkHref) : 'example.com'
  return (
    <MarkdownText markdown={copy.linkTrackingExplanation(previewLink)} />
  )
}

PostsSettingsLinkTracking.propTypes = {
  defaultLink: PropTypes.object,
}

PostsSettingsLinkTracking.defaultProps = {
  defaultLink: {},
}


export default PostsSettingsLinkTracking
