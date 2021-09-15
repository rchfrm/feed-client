import BasicTextPage from '@/BasicTextPage'
import SeoTagsDato from '@/elements/SeoTagsDato'

// Dato data
import getQuery from '@/graphQl/landingTextPageQuery'
import getDatoData from '@/helpers/getDatoData'

export default function About({ pageData }) {
  const { _seoMetaTags: metaTags } = pageData
  return (
    <>
      <SeoTagsDato metaTags={metaTags} />
      <BasicTextPage pageData={pageData} trackLocation="about" />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'about'
  const query = getQuery(pageSlug)
  const pageKey = 'allLandingTextPages'
  const forceLoad = false
  const { data } = await getDatoData(query, `${pageKey}_${pageSlug}`, forceLoad)
  const pageData = data[pageKey][0]
  return {
    props: {
      pageData,
    },
  }
}
