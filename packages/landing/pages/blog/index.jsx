import MetaTags from '@/landing/elements/MetaTags'
import ArticleSummary from '@/landing/ArticleSummary'
import NewsletterSignup from '@/landing/NewsletterSignup'
import Section from '@/landing/Section'
import articles from '@/landing/copy/blog/index.json'

export default function BlogOverview() {
  const articleValues = Object.values(articles)
  return (
    <>
      <MetaTags pageTitle="newsFeed" />
      <Section className={['grid', 'grid-cols-12', 'gap-x-4', 'pb-0'].join(' ')}>
        <h2 className={['col-span-12', 'md:col-span-6', 'md:col-start-4'].join(' ')}>Subscribe</h2>
        <p className={['col-span-12', 'md:col-span-6', 'md:col-start-4'].join(' ')}>We send one email each week with an idea (or two) on how to grow your business and improve your marketing.</p>
        <NewsletterSignup className={['col-span-12', 'md:col-span-6', 'md:col-start-4'].join(' ')} trackLocation="feed-blog" />
      </Section>
      <ArticleSummary articles={articleValues} section="blog" />
    </>
  )
}
