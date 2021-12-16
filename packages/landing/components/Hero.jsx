import PropTypes from 'prop-types'

import HeroImage from '@/landing/HeroImage'
import HeroStrapline from '@/landing/HeroStrapline'
import HeroDescription from '@/landing/HeroDescription'
import HeroSignUp from '@/landing/HeroSignUp'

const Hero = ({
  heroStraplineA,
  heroStraplineB,
  heroCopy,
  heroImageMobile,
  heroImageDesktop,
}) => {
  return (
    <section className="section--padding lg">
      <div className={['grid', 'grid-cols-12', 'xs:gap-4'].join(' ')}>
        <HeroStrapline partA={heroStraplineA} partB={heroStraplineB} />
        <HeroSignUp />
        <HeroDescription description={heroCopy} />
        <HeroImage mobile={heroImageMobile} desktop={heroImageDesktop} />
      </div>
    </section>
  )
}

Hero.propTypes = {
  heroStraplineA: PropTypes.string.isRequired,
  heroStraplineB: PropTypes.string.isRequired,
  heroCopy: PropTypes.string.isRequired,
  heroImageMobile: PropTypes.object.isRequired,
  heroImageDesktop: PropTypes.object.isRequired,
}

export default Hero
