import PropTypes from 'prop-types'

import HeroImage from '@/HeroImage'
import HeroCTA from '@/HeroCTA'
import MarkdownText from '@/elements/MarkdownText'

import * as styles from '@/Hero.module.css'
import RequestAccessForm from "@/RequestAccessForm";

const Hero = ({
  heroStraplineA,
  heroStraplineB,
  heroCopy,
  heroImageMobile,
  heroImageDesktop,
}) => {
  return (
    <section className="section--padding  bmw">
      <div
        className={[
          styles.Hero,
          'grid',
          'grid-cols-12',
          'xs:gap-4',
        ].join(' ')}
      >
        {/* Strapline */}
        <div
          className={[
            styles.strapline,
            'col-span-12',
            'pb-16',

            'xs:col-span-10',

            'sm:col-span-12',
            'sm:col-start-0',
            //
            // 'md:col-span-11',
            // 'md:col-start-1',
          ].join(' ')}
        >
          <h1>{heroStraplineA}</h1>
          <h2><strong>{heroStraplineB}</strong></h2>
        </div>
        <RequestAccessForm
          className={[
            'col-span-12',
            'pb-8',
          ].join(' ')}
          emailOnly
        />
        {/*<HeroCTA*/}
        {/*  classes={{*/}
        {/*    container: [*/}
        {/*      'col-span-12',*/}
        {/*      'grid',*/}
        {/*      'grid-cols-12',*/}
        {/*      'gap-4',*/}
        {/*      styles.heroCTA,*/}
        {/*    ].join(' '),*/}
        {/*    buttonWrapper: [*/}
        {/*      'col-span-12',*/}

        {/*      'xxs:col-span-10',*/}
        {/*      'xxs:col-start-2',*/}

        {/*      'xs:col-span-6',*/}

        {/*      'sm:col-span-5',*/}
        {/*      'sm:col-start-1',*/}

        {/*      'md:col-span-4',*/}
        {/*      'md:col-start-1',*/}
        {/*    ].join(' '),*/}
        {/*  }}*/}
        {/*/>*/}
        {/* Description */}
        <MarkdownText
          className={[
            styles.description,
            'col-span-12',

            // 'xs:col-span-11',
            // 'xs:col-start-1',
            //
            // 'sm:col-span-8',
            // 'sm:col-start-1',
            //
            'md:col-span-7',
            'md:col-start-0',
            //
            // 'lg:col-span-6',
            // 'lg:col-start-1',
          ].join(' ')}
          markdown={heroCopy}
        />
        <HeroImage
          imageMobile={heroImageMobile}
          imageDesktop={heroImageDesktop}
          className={[
            styles.heroImage,
            'col-span-12',
            'hidden',

            'xs:block',

            'sm:col-span-10',
            'sm:col-start-3',

            'md:col-span-8',
            'md:col-start-5',
          ].join(' ')}
        />
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
