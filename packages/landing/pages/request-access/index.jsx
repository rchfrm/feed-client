import BasicTextPage from '@/landing/BasicTextPage'
import RequestAccessForm from '@/landing/RequestAccessForm'
import RequestAccessIntro from '@/landing/RequestAccessIntro'

import SeoTagsDato from '@/landing/elements/SeoTagsDato'

// Dato data
import getQuery from '@/landing/graphQl/landingTextPageQuery'
import getDatoData from '@/landing/helpers/getDatoData'

const pageSlug = 'request-access'

export default function RequestAccess({ pageData }) {
  const { _seoMetaTags: metaTags } = pageData
  const pageIntro = (
    <>
      <RequestAccessIntro />
      <RequestAccessForm />
    </>
  )
  return (
    <>
      <SeoTagsDato metaTags={metaTags} />
      <BasicTextPage
        pageData={pageData}
        trackLocation={pageSlug}
        endContent={pageIntro}
      />
    </>
  )
}

export async function getStaticProps() {
  const query = getQuery(pageSlug)
  const pageKey = 'allLandingTextPages'
  const forceLoad = true
  const { data } = await getDatoData(query, `${pageKey}_${pageSlug}`, forceLoad)
  const pageData = data[pageKey][0]
  return {
    props: {
      pageData,
    },
  }
}
