import { contentBlocks } from '@/graphQl/querySnippets'

export const getAllFaqQuestionsQuery = () => `
  query {
    allFaqArticles {
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
    allFaqArticles {
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
