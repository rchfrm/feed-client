import BasePage from '@/BasePage'
import TestPageReady from '@/TestPageReady'
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
