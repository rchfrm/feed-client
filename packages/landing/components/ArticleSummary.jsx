import React from 'react'
import PropTypes from 'prop-types'
import ArticleSummaryItem from '@/landing/ArticleSummaryItem'
import Section from '@/landing/Section'

const ArticleSummary = ({
  articles,
}) => {
  return (
    <Section>
      <ul className={[
        'grid',
        'grid-cols-12',
        'gap-4',
        'gap-y-10',
      ].join(' ')}
      >
        {articles.map((article) => {
          return (
            <ArticleSummaryItem
              className={[
                'col-span-12',
                'sm:col-span-6',
                'lg:col-span-4',
              ].join(' ')}
              key={article.slug}
              article={article}
            />
          )
        })}
      </ul>
    </Section>
  )
}

ArticleSummary.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
}

export default ArticleSummary
