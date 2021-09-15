import { image, seo } from '@/graphQl/querySnippets'

export const jobIntro = () => `
  id
  jobTitle
  applicationsOpen
  slug
  location
`

// Get overview of job listings for job index page
export const getOverviewQuery = () => `
query {
  allJobListings {
    ${image('jobImage')}
    ${jobIntro()}
  }
}
`

// Get list of slugs for building static pages
export const getLinksQuery = () => `
query {
  allJobListings {
    slug
  }
}
`

export const getArticleQuery = (slug) => `
query {
  jobListing(filter: {slug: {eq: "${slug}"}}) {
    ${jobIntro()}
    headlineSkills
    theRole
    yourSkills
    ourOffer    
    ${seo()}
  }
  jobsInfo {
    theCompany
    submissionInstructions
    email
  }
}
`
