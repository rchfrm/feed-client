import Hero from '@/landing/Hero'
import Testimonies from '@/landing/Testimonies'

// Dato data
import getQuery from '@/landing/graphQl/homePageQuery'
import getDatoData from '@/landing/helpers/getDatoData'
import Features from '@/landing/Features'
import PrimaryCTA from '@/landing/PrimaryCTA'
import BlogSummary from '@/landing/BlogSummary'
import TertiaryCTA from '@/landing/TertiaryCTA'

export default function Landing({ pageData }) {
  const {
    heroStraplineA,
    heroStraplineB,
    heroCopy,
    heroImageMobile,
    heroImageDesktop,
    testimonialList,
    partnerLogoList,
    featureList: features,
    featuredBlogArticles,
  } = pageData
  return (
    <>
      <Hero
        heroStraplineA={heroStraplineA}
        heroStraplineB={heroStraplineB}
        heroCopy={heroCopy}
        heroImageMobile={heroImageMobile}
        heroImageDesktop={heroImageDesktop}
      />
      <Testimonies testimonies={testimonialList} />
      <Features features={features} />
      <PrimaryCTA />
      <BlogSummary featuredBlogArticles={featuredBlogArticles} />
      <TertiaryCTA trackLocation="homepage" />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'home'
  const query = getQuery(pageSlug)
  const forceLoad = false
  const { data } = await getDatoData(query, pageSlug, forceLoad)
  return {
    props: {
      pageData: data.home,
    },
  }
}
