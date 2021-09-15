import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import JobsSummary from '@/landing/JobsSummary'

// Dato data
import { getOverviewQuery } from '@/landing/graphQl/jobListingQueries'
import getDatoData from '@/landing/helpers/getDatoData'

export default function Jobs({ pageData }) {
  return (
    <>
      <SeoTagsDato pageTitle="Jobs" />
      <JobsSummary featuredJobListings={pageData} />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'jobsIndex'
  const query = getOverviewQuery()
  const forceLoad = true
  const { data } = await getDatoData(query, `${pageSlug}`, forceLoad)
  const { allJobListings: pageData } = data
  return {
    props: {
      pageData,
    },
  }
}
