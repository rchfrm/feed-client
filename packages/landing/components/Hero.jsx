import PropTypes from 'prop-types'

import HeroImage from '@/landing/HeroImage'
import HeroStrapLine from '@/landing/HeroStrapLine'
import HeroDescription from '@/landing/HeroDescription'
import HeroSignUp from '@/landing/HeroSignUp'
import Section from '@/landing/Section'

const Hero = ({
  heroStraplineA,
  heroStraplineB,
  heroCopy,
  heroImageMobile,
  heroImageDesktop,
}) => {
  return (
    <Section>
      <HeroStrapLine partA={heroStraplineA} partB={heroStraplineB} />
      <HeroSignUp />
      <HeroDescription description={heroCopy} />
      <HeroImage mobile={heroImageMobile} desktop={heroImageDesktop} />
    </Section>
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
