import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import PostsContent from '@/app/PostsContent'
import getDatoData from '@/helpers/getDatoData'
import query from '@/app/graphQl/dummyPostsQuery'

const headerConfig = {
  text: 'posts',
}

const Page = ({ allDummyPosts }) => {
  return (
    <BasePage
      headerConfig={headerConfig}
      artistRequired
      hasNoProfilesPage
    >
      <PostsContent dummyPostsImages={allDummyPosts} />
    </BasePage>
  )
}

export async function getStaticProps() {
  const forceLoad = false
  const { data: { allDummyPosts } } = await getDatoData(query, 'dummyPostsQuery', forceLoad)
  return {
    props: {
      allDummyPosts,
    },
  }
}

export default testPageReady('app')(Page)
