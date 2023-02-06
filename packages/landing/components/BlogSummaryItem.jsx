import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Image } from 'react-datocms'
import MarkdownText from '@/landing/elements/MarkdownText'
import Anchor from '@/landing/elements/Anchor'
import Button from '@/elements/Button'
import { blogSlug } from '@/landing/copy/LandingPageCopy'

const BlogSummaryItem = ({ blog, className }) => {
  const { title, slug, image, excerpt, publishDate, author } = blog
  const link = `${blogSlug}/${slug}`
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
        <strong>{publishDate}</strong>
        {author && (
          <span className="inline-block pl-2"> {author}</span>
        )}
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
            {image ? (
              <Image data={image.responsiveImage} />
            ) : (
              <div className={['absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-grey'].join(' ')} />
            )}
          </div>
        </figure>
      </Anchor>
      <h3 className={['pointer-events-none', 'mb-0'].join(' ')}><strong>{title}</strong></h3>
      {excerpt && (
        <MarkdownText className={['mb-0'].join(' ')} markdown={excerpt} />
      )}
      <Link href={link}>
        <Button
          version="text"
          href={link}
          label={`Read more about ${title}`}
          trackComponentName="BlogSummaryItem"
        >
          <strong>Read more</strong>
        </Button>
      </Link>
    </li>
  )
}

BlogSummaryItem.propTypes = {
  blog: PropTypes.object.isRequired,
  className: PropTypes.string,
}

BlogSummaryItem.defaultProps = {
  className: null,
}

export default BlogSummaryItem
