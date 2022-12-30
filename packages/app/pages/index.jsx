import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import Posts from '@/app/Posts'
import getDatoData from '@/helpers/getDatoData'
import query from '@/app/graphQl/dummyPostsQuery'

const headerConfig = {
  text: 'ads',
}

const Page = ({ allDummyPosts }) => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
    hasNoProfilesPage
    hasPrimaryLinks
  >
    <Posts dummyPostsImages={allDummyPosts} />
  </BasePage>
)

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
