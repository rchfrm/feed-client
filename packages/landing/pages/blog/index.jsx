import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import BlogSummary from '@/landing/BlogSummary'

// Dato data
import { getOverviewQuery } from '@/landing/graphQl/blogArticlesQueries'
import getDatoData from '@/landing/helpers/getDatoData'

export default function BlogOverview({ pageData }) {
  return (
    <>
      <SeoTagsDato pageTitle="Blog" />
      <BlogSummary
        featuredBlogArticles={pageData}
        sortBy="date"
      />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'blogIndex'
  const query = getOverviewQuery()
  const forceLoad = true
  const { data } = await getDatoData(query, `${pageSlug}`, forceLoad)
  const { allBlogArticles: pageData } = data
  return {
    props: {
      pageData,
    },
  }
}
