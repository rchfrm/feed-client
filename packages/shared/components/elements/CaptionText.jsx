import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const components = {
  a: 'p',
  blockquote: 'p',
  code: 'p',
  em: 'p',
  h1: 'p',
  h2: 'p',
  h3: 'p',
  h4: 'p',
  h5: 'p',
  h6: 'p',
  hr: 'p',
  img: 'p',
  li: 'p',
  ol: 'p',
  p: 'p',
  pre: 'p',
  strong: 'p',
  ul: 'p',
}

const CaptionText = ({
  caption,
  className,
}) => {
  return (
    <MarkdownText
      markdown={caption}
      components={components}
      className={className}
    />
  )
}

CaptionText.propTypes = {
  caption: PropTypes.string.isRequired,
  className: PropTypes.string,
}

CaptionText.defaultProps = {
  className: null,
}

export default React.memo(CaptionText)
