import Hero from '@/landing/Hero'
import PropTypes from 'prop-types'

export default function HomePage({ pageData }) {
  const {
    straplineA,
    straplineB,
    description,
    mobileImage,
    desktopImage,
  } = pageData
  return (
    <>
      <Hero
        heroStraplineA={straplineA}
        heroImageDesktop={desktopImage}
        heroCopy={description}
        heroImageMobile={mobileImage}
        heroStraplineB={straplineB}
      />
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
  }).isRequired,
}
