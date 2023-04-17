import article from '@/landing/copy/blog/spotify-follower-ltv.md'
import MetaTags from '@/landing/elements/MetaTags'
import articles from '@/landing/copy/blog/index.json'

export default function LifetimeValueOfSpotifyFollowerPage() {
  const articleDetails = articles['spotify-follower-ltv']
  const { title, excerpt } = articleDetails
  return (
    <>
      <MetaTags pageDescription={excerpt} pageTitle={title} />
      <BlogArticle article={article} />
    </>
  )
}
