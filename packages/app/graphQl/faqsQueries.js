import { contentBlocks } from '@/graphQl/querySnippets'

export const getAllFaqQuestionsQuery = () => `
  query {
    allFaqArticles(first: 100) {
      slug
      question
      category
    }
  }
`

export const getAllFaqQuestionsByCategoryQuery = category => `
  query {
    allFaqArticles(filter: {category: {eq: "${category}"}}) {
      slug
      question
      category
    }
  }
`

export const getAllFaqSlugsQuery = () => `
  query {
    allFaqArticles(first: 100) {
      slug
    }
  }
`

export const getFaqQuery = (slug) => `
  query {
    faqArticle(filter: {slug: {eq: "${slug}"}}) {
      slug
      question
      ${contentBlocks('answer', 'faq')}
      category
    }
  }
`
