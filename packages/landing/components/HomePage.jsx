import Hero from '@/landing/Hero'
import PropTypes from 'prop-types'
import IntroVideo from '@/landing/IntroVideo'
import Testimonies from '@/landing/Testimonies'
import Partners from '@/landing/Partners'
import Features from '@/landing/Features'
import PrimaryCTA from '@/landing/PrimaryCTA'
import BlogSummary from '@/landing/BlogSummary'
import TertiaryCTA from '@/landing/TertiaryCTA'

export default function HomePage({ pageData }) {
  const {
    straplineA,
    straplineB,
    description,
    mobileImage,
    testimonies,
    partners,
    features,
    featuredArticles,
  } = pageData
  const hasTestimonies = !!testimonies && testimonies.length > 0
  const hasPartners = !!partners && partners.length > 0
  const hasFeatures = !!features && features.length > 0
  const hasFeaturedArticles = !!featuredArticles && featuredArticles.length > 0
  return (
    <>
      <Hero
        heroStraplineA={straplineA}
        heroCopy={description}
        heroImage={mobileImage}
        heroStraplineB={straplineB}
      />
      {hasTestimonies && <Testimonies testimonies={testimonies} />}
      <IntroVideo />
      {hasPartners && <Partners partners={partners} />}
      {hasFeatures && <Features features={features} />}
      <PrimaryCTA />
      {hasFeaturedArticles && (
        <>
          <BlogSummary featuredBlogArticles={featuredArticles} />
          <TertiaryCTA trackLocation="feed-landing" />
        </>
      )}
    </>
  )
}

HomePage.propTypes = {
  pageData: PropTypes.shape({
    straplineA: PropTypes.string.isRequired,
    straplineB: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mobileImage: PropTypes.object.isRequired,
    testimonies: PropTypes.array,
    features: PropTypes.array,
  }).isRequired,
}