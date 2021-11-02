import Hero from '@/landing/Hero'
import Testimonies from '@/landing/Testimonies'

// Dato data
import getQuery from '@/landing/graphQl/homePageQueries'
import getDatoData from '@/landing/helpers/getDatoData'
import HomePage from '@/landing/HomePage'

export default function Landing({ pageData }) {
  return (
    <HomePage
      pageData={pageData}
    />
    // <>
    //   <Hero
    //     heroStraplineA={heroStraplineA}
    //     heroStraplineB={heroStraplineB}
    //     heroCopy={heroCopy}
    //     heroImageMobile={heroImageMobile}
    //     heroImageDesktop={heroImageDesktop}
    //   />
    //   <IntroVideo />
    //   <Features features={features} />
    //   <Testimonies testimonies={testimonialList} />
    //   <PrimaryCTA />
    //   <BlogSummary featuredBlogArticles={featuredBlogArticles} />
    //   <TertiaryCTA trackLocation="feed-landing" />
    // </>
  )
}

export async function getStaticProps() {
  const query = getQuery()
  const forceLoad = true
  const { data } = await getDatoData(query, 'home', forceLoad)
  const { heroCopy: pageData } = data
  return {
    props: {
      pageData,
    },
  }
}
