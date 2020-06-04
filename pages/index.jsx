import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import PostsLoader from '@/PostsLoader'

const headerConfig = {
  text: 'review posts',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <PostsLoader />
  </BasePage>
)


export default testPageReady(Page)
