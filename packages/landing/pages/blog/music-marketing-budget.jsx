import article from '@/landing/copy/blog/music-marketing-budget.md'
import MetaTags from '@/landing/elements/MetaTags'
import articles from '@/landing/copy/blog/index.json'
import Article from '@/landing/Article'

export default function LifetimeValueOfSpotifyFollowerPage() {
  const articleDetails = articles['music-marketing-budget']
  const { title, excerpt } = articleDetails
  return (
    <>
      <MetaTags pageDescription={excerpt} pageTitle={title} />
      <Article article={article} />
    </>
  )
}
