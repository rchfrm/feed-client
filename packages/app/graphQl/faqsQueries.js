import { contentBlocks, seo } from '@/graphQl/querySnippets'
import { blogIntro } from '@/landing/graphQl/blogArticlesQueries'

export const getAllFaqQuestionsQuery = () => `
  query {
    allFaqArticles {
      slug
      question
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
