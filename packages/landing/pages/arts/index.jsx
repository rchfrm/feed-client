import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import HomePage from '@/landing/HomePage'
import getQuery from '@/landing/graphQl/homePageQueries'
import getDatoData from '@/landing/helpers/getDatoData'

export default function Arts({ pageData }) {
  return (
    <>
      <SeoTagsDato pageTitle="Arts" />
      <HomePage
        pageData={pageData}
      />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'arts'
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
