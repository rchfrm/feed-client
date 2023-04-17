import React from 'react'
import PropTypes from 'prop-types'
import TertiaryCTA from '@/landing/TertiaryCTA'
import NewsletterScrollButton from '@/landing/NewsletterScrollButton'
import useBreakpointTest from '@/landing/hooks/useBreakpointTest'
import BlogMarkdown from '@/landing/elements/BlogMarkdown'
import Section from '@/landing/Section'

const Article = ({
  article,
}) => {
  // Handle scrolling to newsletter
  const newsletterRef = React.useRef(null)
  // Test for desktop width (to toggle newsletter scroll button)
  const isDesktopWidth = useBreakpointTest('md')

  return (
    <>
      <Section className="mt-8 md:max-w-screen-md">
        <BlogMarkdown
          markdown={article}
          className={[
            'flex',
            'flex-col',
            'gap-y-8',
            '[&>p]:mb-0',
            '[&>h2]:mb-0',
            '[&>h2]:pt-8',
            '[&>h2]:underline',
            '[&>h2]:underline-offset-4',
            '[&>h2]:decoration-green',
            '[&>img]:w-full',
            '[&>img]:max-w-lg',
            '[&>img]:self-center',
            '[&>blockquote]:max-w-lg',
            '[&>blockquote]:self-center',
          ].join(' ')}
        />
      </Section>

      <div ref={newsletterRef}>
        <TertiaryCTA
          header="Join our newsletter"
          trackLocation="feed-blog"
        />
      </div>

      {isDesktopWidth && newsletterRef.current && (
        <NewsletterScrollButton
          newsletterEl={newsletterRef.current}
          isFixed
        />
      )}
    </>
  )
}

Article.propTypes = {
  article: PropTypes.string.isRequired,
}

export default Article
