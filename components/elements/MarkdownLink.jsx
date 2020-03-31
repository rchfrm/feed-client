import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import helper from '../helpers/helper'

const MarkdownLink = ({ href, children }) => {
  const { props: { value: linkText } } = children[0]
  const linkType = helper.getLinkType(href)
  // INTERNAL LINK
  if (linkType === 'internal') {
    return (
      <Link href={href}>
        <a>{ linkText }</a>
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
