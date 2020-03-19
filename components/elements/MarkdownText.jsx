import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import MarkdownLink from './MarkdownLink'

const MarkdownText = ({ markdown, className }) => {
  return (
    <div className={['text--block', className].join(' ')}>
      <ReactMarkdown
        source={markdown}
        renderers={{ link: MarkdownLink }}
      />
    </div>
  )
}

MarkdownText.propTypes = {
  markdown: PropTypes.string.isRequired,
  className: PropTypes.string,
}

MarkdownText.defaultProps = {
  className: '',
}

export default MarkdownText
