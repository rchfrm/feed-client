import React from 'react'
import PropTypes from 'prop-types'
import BlogSummaryItem from '@/landing/BlogSummaryItem'
import * as blogHelpers from '@/landing/helpers/blogHelpers'
import * as styles from '@/landing/BlogSummary.module.css'
import Section from '@/landing/Section'

const BlogSummary = ({
  featuredBlogArticles,
  sortBy,
  sortOrder,
}) => {
  // Format data from Dato
  const blogs = React.useMemo(() => {
    const articles = featuredBlogArticles.map((article) => {
      const { slug } = article
      const { publishDate, publishDateRaw } = blogHelpers.getArticleDates(article)
      const author = blogHelpers.getArticleAuthor(article)
      return {
        id: article.id,
        title: article.title,
        image: article.leadImage,
        excerpt: article.excerpt,
        slug,
        publishDate,
        publishDateRaw,
        author,
      }
    })
    if (sortBy) return blogHelpers.sortArticles(articles, sortBy, sortOrder)
    return articles
  }, [featuredBlogArticles, sortBy, sortOrder])

  return (
    <Section className="bmw">
      <ul className={[
        styles.blogList,
        'xs:grid',
        'grid-cols-12',
        'gap-4',
        'xs:gap-5',
        'md:gap-20',
        'lg:gap-6',
      ].join(' ')}
      >
        {blogs.map((blog) => {
          return (
            <BlogSummaryItem
              className={[
                'xs:col-span-6',
                'md:col-span-6',
                blogs.length === 1 ? 'lg:col-span-4' : 'lg:col-span-3',
              ].join(' ')}
              key={blog.id}
              blog={blog}
            />
          )
        })}
      </ul>
    </Section>
  )
}

BlogSummary.propTypes = {
  featuredBlogArticles: PropTypes.array.isRequired,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
}

BlogSummary.defaultProps = {
  sortBy: '',
  sortOrder: 'desc',
}

export default BlogSummary
