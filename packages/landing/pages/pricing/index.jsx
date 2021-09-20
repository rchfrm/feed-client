import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import PricingPage from '@/landing/PricingPage'

// Dato data
import getQuery from '@/landing/graphQl/pricingPageQuery'
import getDatoData from '@/landing/helpers/getDatoData'

export default function Pricing({ pageData }) {
  return (
    <>
      <SeoTagsDato pageTitle="Pricing" />
      <PricingPage
        pageData={pageData}
      />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'pricing'
  const query = getQuery(pageSlug)
  const forceLoad = true
  const { data } = await getDatoData(query, pageSlug, forceLoad)
  const { pricing: pageData } = data
  return {
    props: {
      pageData,
    },
  }
}
