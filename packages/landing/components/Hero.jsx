import PropTypes from 'prop-types'

import HeroImage from '@/landing/HeroImage'
import HeroStrapline from '@/landing/HeroStrapline'
import HeroDescription from '@/landing/HeroDescription'
import HeroSignUp from '@/landing/HeroSignUp'

const Hero = ({
  heroStraplineA,
  heroStraplineB,
  heroCopy,
  heroImage,
}) => {
  return (
    <section className="section--padding  bmw">
      <div className={['grid', 'grid-cols-12', 'xs:gap-4'].join(' ')}>
        <HeroStrapline partA={heroStraplineA} partB={heroStraplineB} />
        <HeroSignUp />
        <HeroDescription description={heroCopy} />
        <HeroImage image={heroImage} />
      </div>
    </section>
  )
}

Hero.propTypes = {
  heroStraplineA: PropTypes.string.isRequired,
  heroStraplineB: PropTypes.string.isRequired,
  heroCopy: PropTypes.string.isRequired,
  heroImage: PropTypes.object.isRequired,
}

export default Hero
