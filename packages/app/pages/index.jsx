import BasePage from '@/app/BasePage'
import testPageReady from '@/app/hoc/testPageReady'
import PostsLoader from '@/app/PostsLoader'

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
