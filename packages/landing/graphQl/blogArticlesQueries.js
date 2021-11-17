import { image, contentBlocks, seo } from '@/graphQl/querySnippets'

export const blogIntro = () => `
  id
  _firstPublishedAt
  date
  ${image({ fieldName: 'leadImage', imgixParams: 'auto: format, crop: focalpoint, ar: "450:300", fit: crop' })}
  title
  excerpt
  slug
  authors {
    id
    name
  }
`

// Get overview of blog articles from blog index page
export const getOverviewQuery = (count = 30, skip = 0) => `
query {
  allBlogArticles(first: "${count}", skip: "${skip}", filter: {
    showInArticleList: {eq:true}
  }) {
    ${blogIntro()}
  }
}
`

// Get list of slugs for building static pages
export const getLinksQuery = () => `
query {
  allBlogArticles {
    slug
  }
}
`

export const getArticleQuery = (slug) => `
query {
  blogArticle(filter: {slug: {eq: "${slug}"}}) {
    ${blogIntro()}
    introCopy
    ${contentBlocks()}
    showOutroNewsletter
    showNewsletterCtaButton
    ${seo()}
  }
}
`
