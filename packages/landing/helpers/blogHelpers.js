import moment from 'moment'

import { sortArrayByKey } from '@/landing/helpers/utils'

// GET PUBLISHED DATE OF BLOG
export const getArticleDates = (article) => {
  const { date, _firstPublishedAt } = article
  const publishMoment = moment(date || _firstPublishedAt)
  const dateFormat = "D MMM 'YY"
  const publishDate = publishMoment.format(dateFormat)
  const publishDateRaw = publishMoment.format('X')
  return { publishDate, publishDateRaw }
}

// GET AUTHOR
export const getArticleAuthor = (article) => {
  const { authors } = article
  return authors.length ? authors[0].name : ''
}

// SORT ARTICLES
export const sortArticles = (articles, sortBy, sortOrder) => {
  const sortKey = sortBy === 'date' ? 'publishDateRaw' : null
  if (!sortKey) {
    return articles
  }
  return sortArrayByKey(articles, sortKey, sortOrder)
}
