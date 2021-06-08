import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const components = {
  a: 'span',
  blockquote: 'p',
  code: 'p',
  em: ({ node }) => `*${node.children[0].value}*`,
  strong: ({ node }) => `**${node.children[0].value}**`,
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
  ul: 'p',
}

/* * README
* Renders caption text into markdown by converting all block elements to paragraphs
* and all inline elements to tags.
*
* A better way might be to use this approach:
* https://github.com/remarkjs/react-markdown/issues/111
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
        // 'span',
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
