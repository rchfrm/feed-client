import SeoTagsDato from '@/elements/SeoTagsDato'
import BlogSummary from '@/BlogSummary'

// Dato data
import { getOverviewQuery } from '@/graphQl/blogArticlesQueries'
import getDatoData from '@/helpers/getDatoData'

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
