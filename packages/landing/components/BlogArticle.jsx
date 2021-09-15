import React from 'react'
import PropTypes from 'prop-types'

import BasicTextPage from '@/BasicTextPage'
import TertiaryCTA from '@/TertiaryCTA'
import NewsletterScrollButton from '@/NewsletterScrollButton'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import * as blogHelpers from '@/helpers/blogHelpers'

const BlogArticle = ({
  article,
}) => {
  const { publishDate } = blogHelpers.getArticleDates(article)
  const author = blogHelpers.getArticleAuthor(article)
  // Get newsletter options
  const { showOutroNewsletter, showNewsletterCtaButton } = article
  const authorAndDate = (
    <div className="flex justify-center mb-5">
      <p className="font-bold">{publishDate}</p>
      <p className="ml-3">{author}</p>
    </div>
  )
  // Handle scrolling to newsletter
  const newsletterRef = React.useRef(null)
  // Test for desktop width (to toggle newsletter scroll button)
  const isDesktopWidth = useBreakpointTest('md')

  return (
    <>
      <BasicTextPage
        startContent={authorAndDate}
        pageData={article}
        trackLocation="feed-blog"
      />
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
