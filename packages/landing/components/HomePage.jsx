import Hero from '@/landing/Hero'
import PropTypes from 'prop-types'
import IntroVideo from '@/landing/IntroVideo'
import Testimonies from '@/landing/Testimonies'
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
    desktopImage,
    testimonies,
    features,
    featuredArticles,
  } = pageData
  const hasTestimonies = !!testimonies && testimonies.length > 0
  const hasFeatures = !!features && features.length > 0
  const hasFeaturedArticles = !!featuredArticles && featuredArticles.length > 0
  return (
    <>
      <Hero
        heroStraplineA={straplineA}
        heroImageDesktop={desktopImage}
        heroCopy={description}
        heroImageMobile={mobileImage}
        heroStraplineB={straplineB}
      />
      <IntroVideo />
      {hasFeatures && <Features features={features} />}
      {hasTestimonies && <Testimonies testimonies={testimonies} />}
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
    desktopImage: PropTypes.object.isRequired,
    testimonies: PropTypes.array,
    features: PropTypes.array,
  }).isRequired,
}
