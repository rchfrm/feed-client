import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import ReactMarkdownWithHtml from 'react-markdown/with-html'

import Anchor from '@/elements/Anchor'

const MarkdownText = ({
  markdown,
  allowHtml,
  className,
  style,
}) => {
  return (
    <div className={['text--block', className].join(' ')} style={style}>
      {allowHtml ? (
        <ReactMarkdownWithHtml
          renderers={{ link: Anchor }}
          allowDangerousHtml
        >
          {markdown}
        </ReactMarkdownWithHtml>
      ) : (
        <ReactMarkdown
          renderers={{ link: Anchor }}
        >
          {markdown}
        </ReactMarkdown>
      )}
    </div>
  )
}

MarkdownText.propTypes = {
  markdown: PropTypes.string.isRequired,
  allowHtml: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

MarkdownText.defaultProps = {
  allowHtml: false,
  className: '',
  style: null,
}

export default MarkdownText
