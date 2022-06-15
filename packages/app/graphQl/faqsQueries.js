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
      question
      ${contentBlocks('answer', 'faq')}
    }
  }
`
