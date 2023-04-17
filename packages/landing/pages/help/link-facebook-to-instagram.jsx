import article from '@/landing/copy/help/link-facebook-to-instagram.md'
import MetaTags from '@/landing/elements/MetaTags'
import articles from '@/landing/copy/help/index.json'
import Article from '@/landing/Article'

export default function LifetimeValueOfSpotifyFollowerPage() {
  const articleDetails = articles['link-facebook-to-instagram']
  const { title, excerpt } = articleDetails
  return (
    <>
      <MetaTags pageDescription={excerpt} pageTitle={title} />
      <Article article={article} />
    </>
  )
}
