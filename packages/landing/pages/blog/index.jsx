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
      <ArticleSummary articles={articleValues} section="blog" />
    </>
  )
}
