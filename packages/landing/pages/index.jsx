import Hero from '@/landing/Hero'
import Testimonies from '@/landing/Testimonies'

// Dato data
import getQuery from '@/landing/graphQl/homePageQueries'
import getDatoData from '@/landing/helpers/getDatoData'
import Features from '@/landing/Features'
import PrimaryCTA from '@/landing/PrimaryCTA'
import BlogSummary from '@/landing/BlogSummary'
import TertiaryCTA from '@/landing/TertiaryCTA'
import IntroVideo from '@/landing/IntroVideo'

export default function Landing({ pageData }) {
  const {
    heroStraplineA,
    heroStraplineB,
    heroCopy,
    heroImageMobile,
    heroImageDesktop,
    testimonialList,
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
      <IntroVideo />
      <Features features={features} />
      <Testimonies testimonies={testimonialList} />
      <PrimaryCTA />
      <BlogSummary featuredBlogArticles={featuredBlogArticles} />
      <TertiaryCTA trackLocation="feed-landing" />
    </>
  )
}

export async function getStaticProps() {
  const pageSlug = 'home'
  const query = getQuery(pageSlug)
  const forceLoad = true
  const { data } = await getDatoData(query, pageSlug, forceLoad)
  return {
    props: {
      pageData: data.home,
    },
  }
}
