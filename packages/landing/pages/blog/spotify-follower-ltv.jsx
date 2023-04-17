import Section from '@/landing/Section'
import article from '@/landing/copy/blog/spotifyFollowerLTV.md'
import BlogMarkdown from '@/landing/elements/BlogMarkdown'
import MetaTags from '@/landing/elements/MetaTags'
import articles from '@/landing/copy/blog/index.json'

export default function LifetimeValueOfSpotifyFollowerPage() {
  const articleDetails = articles['spotify-follower-ltv']
  const { title, excerpt } = articleDetails
  return (
    <>
      <MetaTags pageDescription={excerpt} pageTitle={title} />
      <Section className="mt-8 md:max-w-screen-md">
        <BlogMarkdown
          markdown={article}
          className={[
            'flex',
            'flex-col',
            'gap-y-8',
            '[&>p]:mb-0',
            '[&>h2]:mb-0',
            '[&>h2]:pt-8',
            '[&>h2]:underline',
            '[&>h2]:underline-offset-4',
            '[&>h2]:decoration-green',
            '[&>img]:w-full',
            '[&>img]:max-w-lg',
            '[&>img]:self-center',
            '[&>blockquote]:max-w-lg',
            '[&>blockquote]:self-center',
          ].join(' ')}
        />
      </Section>
    </>
  )
}
