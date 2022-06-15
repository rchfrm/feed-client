import MarkdownText from '@/elements/MarkdownText'
import React from 'react'
import PropTypes from 'prop-types'

export default function FaqContent({ faq }) {
  const {
    question,
    answer,
  } = faq
  return (
    <div
      className={[
        'pb-8',
        'md:col-span-8',
      ].join(' ')}
    >
      <h3 className={['leading-tight', 'font-bold'].join(' ')}>{question}</h3>
      {answer.map(contentBlock => {
        const {
          id,
          copy,
          _modelApiKey: contentType,
        } = contentBlock

        // COPY
        if (contentType === 'copy') {
          return (
            <MarkdownText markdown={copy} key={id} />
          )
        }

        return null
      })}
    </div>
  )
}

FaqContent.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.array.isRequired,
  }).isRequired,
}
