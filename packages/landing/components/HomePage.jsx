import PropTypes from 'prop-types'
import Partners from '@/landing/Partners'
import Section from '@/landing/Section'
import Image from 'next/image'
import MarkdownText from '@/elements/MarkdownText'
import Features from '@/landing/Features'
import TryFeed from '@/landing/TryFeed'
import PrimaryCTA from '@/landing/PrimaryCTA'

const copy = {
  header: 'Add real people to your audience',
  description: 'Feed automates Meta campaigns: taking care of audience creation, campaign set up and continuous optimisation.\n\nThe platform maximises your budget to reach real, engaged people. No bots.',
  features: [
    // Takes minutes to set up
    // Unique insights
    // Shareable reports
    // Existing content
    // A/B testing to maximise budget
    {
      id: 'feature-1',
      header: 'Get started in minutes',
      copy: 'Once you connect Feed to your ad account, you can start running campaigns in minutes.\n\nNo need to manually set up audiences or campaigns.',
    },
    {
      id: 'feature-2',
      header: 'Unique insights',
      copy: 'Feed provides unique insight into your audience. Breakdown follower growth by age, gender, city and country.\n\nSo you can hone in on what works best.',
    },
    {
      id: 'feature-3',
      header: 'Clear, shareable reports',
      copy: 'Our reports show the impact of your campaigns in a format and language that\'s clear and simple.\n\nAllowing you to share them with the whole team.',
    },
    {
      id: 'feature-4',
      header: 'Promote organic posts',
      copy: 'The algorithm analyses existing social media posts to identify what has potential as an ad.\n\nThis means there\'s no need to create new content or get additional sign off.',
    },
    {
      id: 'feature-5',
      header: 'Always-on testing process',
      copy: 'Creatives are continuously tested against each other to identify the best performers. Those that don\'t perform are swapped for the next creative in the queue every 48 hours.\n\nYou can decide the order or let Feed optimise for you.',
    },
  ],
}

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
          'mb-16',
        ].join(' ')}
      >
        <Section className={[
          'flex',
          'flex-col',
          'gap-y-6',
          'minContent:gap-y-8',
        ].join(' ')}
        >
          <MarkdownText
            className="text-4xl minContent:text-5xl mb-0 h1"
            markdown={copy.header}
          />
          <MarkdownText markdown={copy.description} className="mb-0 minContent:text-xl" />
        </Section>
        <Section>
          <TryFeed buttonText="Start a campaign" className="w-full" />
        </Section>
        {hasPartners && <Partners partners={partners} />}
        <Section>
          <Image
            src="https://storage.googleapis.com/feed-public/Landing-Example_Results_Page.png"
            width={1440}
            height={1024}
            className="drop-shadow-lg"
          />
        </Section>
        <Features features={copy.features} />
        <PrimaryCTA />
      </main>
    </>
  )
  // return (
  //   <div
  //     className={[
  //       'flex',
  //       'flex-col',
  //       'gap-y-16',
  //       'sm:gap-y-40',
  //       'pt-16',
  //     ].join(' ')}
  //   >
  //     <Section>
  //       <HeroStrapLine />
  //     </Section>
  //     <Section>
  //       <HeroSignUp />
  //     </Section>
  //     {hasPartners && <Partners partners={partners} />}
  //     {hasFeatures && <Features features={features} />}
  //     <IntroVideo />
  //     <PrimaryCTA />
  //     {hasTestimonies && <Testimonies testimonies={testimonies} />}
  //     {hasFeaturedArticles && (
  //       <>
  //         <BlogSummary featuredBlogArticles={featuredArticles} />
  //         <TertiaryCTA trackLocation="feed-landing" />
  //       </>
  //     )}
  //   </div>
  // )
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
