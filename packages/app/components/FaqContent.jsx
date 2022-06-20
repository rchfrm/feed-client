import MarkdownText from '@/elements/MarkdownText'
import React from 'react'
import PropTypes from 'prop-types'
import VideoEmbed from '@/elements/VideoEmbed'
import { Image } from 'react-datocms'

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
      <h3 className={['leading-tight', 'font-bold', 'mb-8'].join(' ')}>{question}</h3>
      {answer.map(contentBlock => {
        const {
          id,
          copy,
          _modelApiKey: contentType,
        } = contentBlock

        // COPY
        if (contentType === 'copy') {
          return (
            <MarkdownText className="mb-8" markdown={copy} key={id} />
          )
        }

        // IMAGE
        if (contentType === 'image') {
          return (
            <figure
              className={[
                'xs:w-9/12',
                'mx-auto',
                'mb-8',
              ].join(' ')}
            >
              <Image data={contentBlock.image.responsiveImage} />
            </figure>
          )
        }

        // EMBED
        if (contentType === 'embed' && contentBlock.externalVideo?.provider === 'youtube') {
          return (
            <VideoEmbed
              key={id}
              video={contentBlock.externalVideo}
              videoLocation={`FAQ - ${question}`}
              className={['mb-8', 'xs:w-9/12', 'mx-auto'].join(' ')}
            />
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
