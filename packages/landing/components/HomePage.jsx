import Hero from '@/landing/Hero'
import PropTypes from 'prop-types'
import IntroVideo from '@/landing/IntroVideo'
import Testimonies from '@/landing/Testimonies'

export default function HomePage({ pageData }) {
  const {
    straplineA,
    straplineB,
    description,
    mobileImage,
    desktopImage,
    testimonies,
  } = pageData
  const hasTestimonies = !!testimonies && testimonies.length > 0
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
      {hasTestimonies && <Testimonies testimonies={testimonies} />}
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
  }).isRequired,
}
