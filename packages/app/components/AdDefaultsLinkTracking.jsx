import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { removeProtocolFromUrl } from '@/helpers/utils'

import copy from '@/app/copy/controlsPageCopy'

const adDefaultsLinkTracking = ({ defaultLink }) => {
  const { href: defaultLinkHref = '' } = defaultLink
  const previewLink = defaultLinkHref ? removeProtocolFromUrl(defaultLinkHref) : 'example.com'
  return (
    <MarkdownText markdown={copy.linkTrackingExplanation(previewLink)} />
  )
}

adDefaultsLinkTracking.propTypes = {
  defaultLink: PropTypes.object,
}

adDefaultsLinkTracking.defaultProps = {
  defaultLink: {},
}


export default adDefaultsLinkTracking
