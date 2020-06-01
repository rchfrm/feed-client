import BasePage from '../components/BasePage'
import TestPageReady from '../components/TestPageReady'
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


export default TestPageReady(Page)
