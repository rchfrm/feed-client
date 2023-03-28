import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import * as utils from '@/helpers/utils'
import * as ROUTES from '@/app/constants/routes'

const convertInternalLink = (href) => {
  if (href.includes('ROUTES.')) {
    // Parse string
    const internalPageName = href
      .replace('${', '')
      .replace('}', '')
      .split('.')[1]
    // Get page path from routes
    // eslint-disable-next-line import/namespace
    return ROUTES[internalPageName]
  }
  return href
}

const MarkdownLink = ({ href, children }) => {
  const linkText = children[0]
  const formattedLink = convertInternalLink(href)
  const linkType = utils.getLinkType(formattedLink)
  // INTERNAL LINK
  if (linkType === 'internal') {
    return (
      <Link href={formattedLink}>
        {linkText}
      </Link>
    )
  }
  // EMAIL LINK
  if (linkType === 'email') {
    return <a href={href}>{ linkText }</a>
  }
  // EXTERNAL LINK
  return <a href={href} target="_blank" rel="noopener noreferrer">{ linkText }</a>
}

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

export default MarkdownLink
