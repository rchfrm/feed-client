import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import MarkdownLink from '@/elements/MarkdownLink'

const MarkdownText = ({
  markdown,
  skipTextBlock,
  disallowedElements,
  allowedElements,
  unwrapDisallowed,
  components,
  className,
  style,
}) => {
  const content = (
    <ReactMarkdown
      renderers={{ link: MarkdownLink }}
      disallowedElements={disallowedElements}
      allowedElements={allowedElements}
      unwrapDisallowed={unwrapDisallowed}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  )
  // PLAIN MARKDOWN
  if (skipTextBlock) return content
  // MARKDOWN IN TEXT BLOCK
  return (
    <div className={['text--block', className].join(' ')} style={style}>
      {content}
    </div>
  )
}

MarkdownText.propTypes = {
  markdown: PropTypes.string.isRequired,
  skipTextBlock: PropTypes.bool,
  disallowedElements: PropTypes.array,
  allowedElements: PropTypes.array,
  unwrapDisallowed: PropTypes.bool,
  components: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

MarkdownText.defaultProps = {
  skipTextBlock: false,
  disallowedElements: undefined,
  allowedElements: undefined,
  unwrapDisallowed: false,
  components: null,
  className: '',
  style: null,
}

export default React.memo(MarkdownText)
