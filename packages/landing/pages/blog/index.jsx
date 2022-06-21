import SeoTagsDato from '@/landing/elements/SeoTagsDato'
import BlogSummary from '@/landing/BlogSummary'
import { getOverviewQuery } from '@/landing/graphQl/blogArticlesQueries'
import getDatoData from '@/landing/helpers/getDatoData'
import NewsletterSignup from '@/landing/NewsletterSignup'
import Section from '@/landing/Section'

export default function BlogOverview({ pageData }) {
  return (
    <>
      <SeoTagsDato pageTitle="Blog" />
      <Section className={['grid', 'grid-cols-12', 'gap-x-4', 'pb-0'].join(' ')}>
        <h2 className={['col-span-12', 'md:col-span-6', 'md:col-start-4'].join(' ')}>Subscribe</h2>
        <p className={['col-span-12', 'md:col-span-6', 'md:col-start-4'].join(' ')}>We send one email each week with an idea (or two) on how to grow your business and improve your marketing.</p>
        <NewsletterSignup className={['col-span-12', 'md:col-span-6', 'md:col-start-4'].join(' ')} trackLocation="feed-blog" />
      </Section>
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
