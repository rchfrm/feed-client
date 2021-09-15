import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import BlogArticle from '@/landing/BlogArticle'

// Dato data
import { getLinksQuery, getArticleQuery } from '@/landing/graphQl/blogArticlesQueries'
import getDatoData from '@/landing/helpers/getDatoData'

export default function BlogArticlePage({ pageData }) {
  const { _seoMetaTags: metaTags } = pageData
  return (
    <>
      <SeoTagsDato metaTags={metaTags} />
      <BlogArticle article={pageData} />
    </>
  )
}

export async function getStaticPaths() {
  const query = getLinksQuery()
  const pageKey = 'blogArticleLinks'
  const forceLoad = true
  const { data: { allBlogArticles } } = await getDatoData(query, pageKey, forceLoad)

  // Get the paths we want to pre-render based on posts
  const paths = allBlogArticles.map(({ slug }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { slug: pageSlug } }) {
  const query = getArticleQuery(pageSlug)
  const pageKey = 'blogArticle'
  const forceLoad = true
  const { data: { blogArticle: pageData } } = await getDatoData(query, `${pageKey}_${pageSlug}`, forceLoad)
  return {
    props: {
      pageData,
    },
  }
}
