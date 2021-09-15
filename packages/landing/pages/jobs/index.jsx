import SeoTagsDato from '@/elements/SeoTagsDato'
import JobsSummary from '@/JobsSummary'

// Dato data
import { getOverviewQuery } from '@/graphQl/jobListingQueries'
import getDatoData from '@/helpers/getDatoData'

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
