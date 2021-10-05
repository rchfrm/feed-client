import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import JobDetails from '@/landing/JobDetails'

// Dato data
import { getLinksQuery, getArticleQuery } from '@/landing/graphQl/jobListingQueries'
import getDatoData from '@/landing/helpers/getDatoData'

export default function JobListing({ pageData }) {
  const { _seoMetaTags: metaTags } = pageData
  return (
    <>
      <SeoTagsDato metaTags={metaTags} />
      <JobDetails pageData={pageData} />
    </>
  )
}

export async function getStaticPaths() {
  const query = getLinksQuery()
  const pageKey = 'jobListingLinks'
  const forceLoad = true
  const { data: { allJobListings } } = await getDatoData(query, pageKey, forceLoad)

  // Get the paths we want to pre-render based on posts
  const paths = allJobListings.map(({ slug }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug: pageSlug } }) {
  const query = getArticleQuery(pageSlug)
  const pageKey = 'jobListing'
  const forceLoad = true
  const pageData = await getDatoData(query, `${pageKey}_${pageSlug}`, forceLoad)
  return {
    props: {
      pageData,
    },
  }
}
