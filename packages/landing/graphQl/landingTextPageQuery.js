import { image, contentBlocks, seo } from '@/landing/graphQl/querySnippets'

const getQuery = (slug) => `
query {
  allLandingTextPages(filter: {slug: {eq: "${slug}"}}) {
    id
    title
    slug
    introCopy
    ${image('leadImage')}
    ${seo()}
    ${contentBlocks('content', 'textPage')}
  }
}
`

export default getQuery
