import React from 'react'
import PropTypes from 'prop-types'
import TertiaryCTA from '@/landing/TertiaryCTA'
import NewsletterScrollButton from '@/landing/NewsletterScrollButton'
import useBreakpointTest from '@/landing/hooks/useBreakpointTest'

const BlogArticle = ({
  article,
}) => {
  // Get newsletter options
  const { showOutroNewsletter, showNewsletterCtaButton } = article
  // Handle scrolling to newsletter
  const newsletterRef = React.useRef(null)
  // Test for desktop width (to toggle newsletter scroll button)
  const isDesktopWidth = useBreakpointTest('md')

  return (
    <>
      {showOutroNewsletter && (
        <TertiaryCTA
          ref={newsletterRef}
          header="Join our newsletter"
          trackLocation="feed-blog"
        />
      )}
      {isDesktopWidth && newsletterRef.current && showNewsletterCtaButton && (
        <NewsletterScrollButton
          newsletterEl={newsletterRef.current}
          isFixed
        />
      )}
    </>
  )
}

BlogArticle.propTypes = {
  article: PropTypes.object.isRequired,
}

export default BlogArticle
