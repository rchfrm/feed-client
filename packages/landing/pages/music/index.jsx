import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import HomePage from '@/landing/HomePage'
import getQuery from '@/landing/graphQl/homePageQueries'
import getDatoData from '@/landing/helpers/getDatoData'

export default function Music({ pageData }) {
  return (
    <>
      <SeoTagsDato pageTitle="Music" />
      <HomePage
        pageData={pageData}
      />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'music'
  const query = getQuery(pageSlug)
  const forceLoad = true
  const { data } = await getDatoData(query, pageSlug, forceLoad)
  const { heroCopy: pageData } = data
  return {
    props: {
      pageData,
    },
  }
}
