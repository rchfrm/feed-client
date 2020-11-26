import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import MarkdownLink from '@/elements/MarkdownLink'

const MarkdownText = ({ markdown, className, style }) => {
  return (
    <div className={['text--block', className].join(' ')} style={style}>
      <ReactMarkdown
        renderers={{ link: MarkdownLink }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

MarkdownText.propTypes = {
  markdown: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

MarkdownText.defaultProps = {
  className: '',
  style: {},
}

export default MarkdownText
