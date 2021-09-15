import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import BasicTextPageHeader from '@/BasicTextPageHeader'
import BasicTextPageCopy from '@/BasicTextPageCopy'
import BasicTextPageImage from '@/BasicTextPageImage'
import BasicTextPageEmbed from '@/BasicTextPageEmbed'
import BasicTextPageNewsletter from '@/BasicTextPageNewsletter'

const BasicTextPage = ({
  startContent,
  pageData,
  endContent,
  isFullWidth,
  trackLocation,
}) => {
  const { title, introCopy, content = [] } = pageData
  return (
    <article
      className={[
        'mx-auto',
        !isFullWidth ? 'sm:max-w-3xl' : null,
        'p-5 xs:p-8 sm:p-6',
        'py-10 xs:py-14 sm:py-20',
      ].join(' ')}
    >
      {/* END CONTENT */}
      {startContent}
      {/* HEADER */}
      <BasicTextPageHeader
        header={title}
        Tag="h1"
        size="large"
        className={[
          'sm:text-center',
        ].join(' ')}
      />
      {/* INTRO TEXT */}
      {introCopy && (
        <MarkdownText
          markdown={introCopy}
          className={[
            '-text--lg',
            'mb-8 xs:mb-12 sm:mb-16',
          ].join(' ')}
        />
      )}
      {/* MAIN CONTENT */}
      {content.map((contentBlock) => {
        const { id, _modelApiKey: contentType } = contentBlock
        // HEADER
        if (contentType === 'section_header') {
          return (
            <BasicTextPageHeader
              key={id}
              header={contentBlock.header}
            />
          )
        }
        // COPY
        if (contentType === 'copy') {
          return (
            <BasicTextPageCopy
              key={id}
              copy={contentBlock.copy}
            />
          )
        }
        // IMAGE
        if (contentType === 'image') {
          return (
            <BasicTextPageImage
              key={id}
              image={contentBlock.image}
              breakoutWidth={contentBlock.breakoutWidth}
            />
          )
        }
        // EMBED
        if (contentType === 'embed') {
          return (
            <BasicTextPageEmbed
              key={id}
              externalVideo={contentBlock.externalVideo}
              otherEmbed={contentBlock.otherEmbed}
            />
          )
        }
        // NEWSLETTER
        if (contentType === 'newsletter_sign_up') {
          return (
            <BasicTextPageNewsletter
              key={id}
              header={contentBlock.header}
              ctaText={contentBlock.cta}
              trackLocation={trackLocation}
            />
          )
        }
        return null
      })}
      {/* END CONTENT */}
      {endContent}
    </article>
  )
}

BasicTextPage.propTypes = {
  startContent: PropTypes.node,
  pageData: PropTypes.object.isRequired,
  endContent: PropTypes.node,
  isFullWidth: PropTypes.bool,
  trackLocation: PropTypes.string,
}

BasicTextPage.defaultProps = {
  startContent: null,
  endContent: null,
  isFullWidth: false,
  trackLocation: 'blog',
}

export default React.memo(BasicTextPage)
