import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import BasicTextPage from '@/landing/BasicTextPage'
import getLegalPagesQuery from '@/landing/graphQl/getLegalPagesQuery'
import getContentQuery from '@/landing/graphQl/landingTextPageQuery'
import getDatoData from '@/landing/helpers/getDatoData'

export default function Legal({ pageData }) {
  const { _seoMetaTags: metaTags } = pageData
  return (
    <>
      <SeoTagsDato metaTags={metaTags} />
      <BasicTextPage pageData={pageData} />
    </>
  )
}

export async function getStaticPaths() {
  const query = getLegalPagesQuery()
  const pageKey = 'getLegalPages'
  const forceLoad = false
  const { data: { home: { legalPages } } } = await getDatoData(query, pageKey, forceLoad)

  // Get the paths we want to pre-render based on posts
  const paths = legalPages.map(({ slug }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug: pageSlug } }) {
  const query = getContentQuery(pageSlug)
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
