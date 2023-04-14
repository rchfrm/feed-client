import PropTypes from 'prop-types'
import Partners from '@/landing/Partners'
import Section from '@/landing/Section'
import Image from 'next/image'
import MarkdownText from '@/elements/MarkdownText'
import Features from '@/landing/Features'
import TryFeed from '@/landing/TryFeed'
import PricingPlans from '@/landing/PricingPlans'
import copy from '@/landing/copy/LandingPageCopy'

export default function HomePage({ pageData }) {
  const {
    partners,
  } = pageData
  const hasPartners = !! partners && partners.length > 0
  return (
    <>
      <main
        className={[
          'flex',
          'flex-col',
          'gap-y-8',
          'sm:gap-y-16',
          'sm:mt-8',
          'mb-16',
        ].join(' ')}
      >
        <Section className={[
          'flex',
          'flex-col',
          'gap-y-8',
          'xs:gap-y-16',
          'md:flex-row',
        ].join(' ')}
        >
          <div
            className={[
              'flex',
              'flex-col',
              'gap-y-8',
            ].join(' ')}
          >
            <MarkdownText
              className={[
                'text-4xl',
                'minContent:text-5xl',
                'mb-0',
                'h1',
              ].join(' ')}
              markdown={copy.header}
            />
            <MarkdownText
              markdown={copy.description}
              className={[
                'mb-0',
                'minContent:text-xl',
              ].join(' ')}
            />
            <TryFeed
              buttonText="Start a campaign"
              className={[
                'mt-4',
                'minContent:self-center',
                'minContent:max-w-sm',
                'minContent:w-1/2',
                'minContent:h-16',
                'minContent:text-xl',
                'md:hidden',
              ].join(' ')}
            />
          </div>
          {hasPartners && <Partners partners={partners} />}
        </Section>
        <Section className={['justify-center md:flex hidden'].join(' ')} fullWidth>
          <TryFeed
            buttonText="Start a campaign"
            className={[
              'w-full',
              'flex',
              'justify-center',
              'minContent:max-w-sm',
              'minContent:h-16',
              'minContent:text-xl',
            ].join(' ')}
          />
        </Section>
        <Section>
          <Image
            src="https://storage.googleapis.com/feed-public/Landing-Example_Results_Page.png"
            width={1440}
            height={1024}
            className="drop-shadow-lg"
            alt="Example results page in Feed app"
            priority
          />
        </Section>
        <Features features={copy.features} />
        <PricingPlans />
        <Section className={['justify-center flex'].join(' ')} fullWidth>
          <TryFeed
            buttonText="Start a campaign"
            className={[
              'w-full',
              'flex',
              'justify-center',
              'minContent:max-w-sm',
              'minContent:h-16',
              'minContent:text-xl',
            ].join(' ')}
          />
        </Section>
      </main>
    </>
  )
}

HomePage.propTypes = {
  pageData: PropTypes.shape({
    strapLine: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mobileImage: PropTypes.object.isRequired,
    desktopImage: PropTypes.object.isRequired,
    testimonies: PropTypes.array,
    features: PropTypes.array,
  }).isRequired,
}
