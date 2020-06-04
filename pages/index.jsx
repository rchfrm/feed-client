import BasePage from '../components/BasePage'
import testPageReady from '../components/hoc/testPageReady'
import PostsLoader from '../components/PostsLoader'

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
