import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import { Image } from 'react-datocms'

import MarkdownText from '@/landing/elements/MarkdownText'
import Anchor from '@/landing/elements/Anchor'
import Button from '@/elements/Button'

import { blogSlug } from '@/landing/copy/LandingPageCopy'

import * as styles from '@/landing/BlogSummary.module.css'

const BlogSummaryItem = ({ blog, className }) => {
  const { title, slug, image, excerpt, publishDate, author } = blog
  const link = `${blogSlug}/${slug}`
  return (
    <li className={`${styles.blogSummaryItem} ${className}`}>
      <p
        className={[
          styles.blogDate,
          'small--p',
        ].join(' ')}
      >
        <strong>{publishDate}</strong>
        {author && (
          <span className="inline-block pl-2"> {author}</span>
        )}
      </p>
      <Anchor className={styles.blogImageLink} href={link} label={`Read more about ${title}`}>
        <figure className={styles.blogFigure}>
          <div className={styles.blogImage}>
            {image ? (
              <Image data={image.responsiveImage} />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-grey-2" />
            )}
          </div>
        </figure>
      </Anchor>
      <h3 className={styles.blogTitle}><strong>{title}</strong></h3>
      {excerpt && (
        <MarkdownText className={styles.blogExcerpt} markdown={excerpt} />
      )}
      <Link href={link}>
        <Button
          version="text"
          href={link}
          label={`Read more about ${title}`}
          className="inline-block h-auto"
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
