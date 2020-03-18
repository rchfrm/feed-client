import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const MarkdownLink = ({ href, children }) => {
  const { props: { value: linkText } } = children[0]
  // INTERNAL LINK
  if (href[0] === '/') {
    return (
      <Link href={href}>
        <a>{ linkText }</a>
      </Link>
    )
  }
  // EXTERNAL LINK
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">{ linkText }</a>
  )
}

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

export default MarkdownLink
