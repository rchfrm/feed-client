import Section from '@/landing/Section'
import article from '@/landing/copy/help/link-facebook-to-instagram.md'
import BlogMarkdown from '@/landing/elements/BlogMarkdown'
import MetaTags from '@/landing/elements/MetaTags'
import articles from '@/landing/copy/help/index.json'

export default function LifetimeValueOfSpotifyFollowerPage() {
  const articleDetails = articles['linking-facebook-to-instagram']
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
