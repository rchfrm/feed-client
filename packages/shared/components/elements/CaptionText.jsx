import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const components = {
  a: 'text',
  blockquote: 'p',
  code: 'p',
  em: 'text',
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
  strong: 'text',
  ul: 'p',
}

/* * README
* Renders caption text into markdown by converting all block elements to paragraphs
* and all inline elements to tags
*/

const CaptionText = ({
  caption,
  className,
}) => {
  return (
    <MarkdownText
      markdown={caption}
      components={components}
      className={className}
      allowedElements={[
        'paragraph',
        'text',
      ]}
      unwrapDisallowed
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
