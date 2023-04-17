import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Anchor from '@/landing/elements/Anchor'
import Button from '@/elements/Button'
import { blogSlug } from '@/landing/copy/LandingPageCopy'
import MarkdownText from '@/elements/MarkdownText'
import moment from 'moment'
import Image from 'next/image'

const ArticleSummaryItem = ({ article, className, section }) => {
  const {
    title,
    slug,
    image: {
      url: imageURL,
      alt: imageAlt,
    },
    excerpt,
    publishedAt,
    updatedAt,
    author,
  } = article
  const publishDate = moment(publishedAt, 'YYYY-MM-DD').format('D MMM, \'YY')
  const updatedDate = updatedAt && moment(updatedAt, 'YYYY-MM-DD').format('D MMM, \'YY')
  const date = updatedDate || publishDate
  const link = `/${section}/${slug}`
  return (
    <li
      className={[
        className,
        'flex',
        'flex-column',
        'gap-3',
      ].join(' ')}
    >
      <p className={['small--p', 'mb-0'].join(' ')}>
        <strong>{date}</strong>
        <span className="inline-block pl-2"> {author}</span>
      </p>
      <Anchor href={link} label={`Read more about ${title}`}>
        <figure
          className={[
            'relative',
            'overflow-hidden',
            'rounded-dialogue',
            'leading-[0]',
            'pb-[50%]',
            'sm:pb-[65%]',
          ].join(' ')}
        >
          <div
            className={[
              'absolute',
              'inset-0',
              'w-full',
              'h-full',
              'rounded-dialogue',
            ].join(' ')}
          >
            <Image src={imageURL} alt={imageAlt} fill />
          </div>
        </figure>
      </Anchor>
      <h3 className={['pointer-events-none', 'mb-0'].join(' ')}><strong>{title}</strong></h3>
      <MarkdownText className={['mb-0'].join(' ')} markdown={excerpt} />
      <Link href={link}>
        <Button
          version="text"
          label={`Read more about ${title}`}
          trackComponentName="BlogSummaryItem"
          className="no-underline"
        >
          <strong>Read more</strong>
        </Button>
      </Link>
    </li>
  )
}

ArticleSummaryItem.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    excerpt: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    author: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  section: PropTypes.oneOf(['blog', 'help']),
}

ArticleSummaryItem.defaultProps = {
  className: null,
  section: 'blog',
}

export default ArticleSummaryItem
