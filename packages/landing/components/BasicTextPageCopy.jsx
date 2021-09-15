import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/landing/elements/MarkdownText'

const BasicTextPageCopy = ({ copy, className }) => {
  return (
    <MarkdownText
      markdown={copy}
      className={[
        'mb-10 xs:mb-12 sm:mb-16',
        '-text--md',
        className,
      ].join(' ')}
    />
  )
}

BasicTextPageCopy.propTypes = {
  copy: PropTypes.string.isRequired,
  className: PropTypes.string,
}

BasicTextPageCopy.defaultProps = {
  className: null,
}

export default BasicTextPageCopy
