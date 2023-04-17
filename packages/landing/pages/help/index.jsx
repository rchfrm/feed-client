import MetaTags from '@/landing/elements/MetaTags'
import ArticleSummary from '@/landing/ArticleSummary'
import articles from '@/landing/copy/help/index.json'

export default function HelpOverview() {
  const articleValues = Object.values(articles)
  return (
    <>
      <MetaTags pageTitle="Feed Help & Support" />
      <ArticleSummary articles={articleValues} section="help" />
    </>
  )
}
