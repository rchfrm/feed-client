import PropTypes from 'prop-types'

import HeroImage from '@/landing/HeroImage'
import HeroStrapLine from '@/landing/HeroStrapLine'
import HeroDescription from '@/landing/HeroDescription'
import HeroSignUp from '@/landing/HeroSignUp'
import Section from '@/landing/Section'

const Hero = ({
  strapLine,
  copy,
  imageMobile,
  imageDesktop,
}) => {
  return (
    <Section
      className={[
        'flex',
        'flex-column',
        'gap-y-10',
        'sm:grid',
        'sm:grid-cols-12',
        'sm:gap-x-4',
        'pt-10',
      ].join(' ')}
    >
      <HeroStrapLine strapLine={strapLine} />
      <HeroSignUp />
      <HeroDescription description={copy} />
      <HeroImage mobile={imageMobile} desktop={imageDesktop} />
    </Section>
  )
}

Hero.propTypes = {
  strapLine: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  imageMobile: PropTypes.object.isRequired,
  imageDesktop: PropTypes.object.isRequired,
}

export default Hero
