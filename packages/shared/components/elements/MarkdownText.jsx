import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ReactMarkdownWithHtml from 'react-markdown/with-html'

import MarkdownLink from '@/elements/MarkdownLink'

const MarkdownText = ({
  markdown,
  allowHtml,
  skipTextBlock,
  disallowedTypes,
  unwrapDisallowed,
  className,
  style,
}) => {
  const content = allowHtml ? (
    <ReactMarkdownWithHtml
      renderers={{ link: MarkdownLink }}
      disallowedTypes={disallowedTypes}
      unwrapDisallowed={unwrapDisallowed}
      allowDangerousHtml
    >
      {markdown}
    </ReactMarkdownWithHtml>
  ) : (
    <ReactMarkdown
      renderers={{ link: MarkdownLink }}
      disallowedTypes={disallowedTypes}
      unwrapDisallowed={unwrapDisallowed}
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
  allowHtml: PropTypes.bool,
  skipTextBlock: PropTypes.bool,
  disallowedTypes: PropTypes.array,
  unwrapDisallowed: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

MarkdownText.defaultProps = {
  allowHtml: false,
  skipTextBlock: false,
  disallowedTypes: [],
  unwrapDisallowed: false,
  className: '',
  style: null,
}

export default React.memo(MarkdownText)
