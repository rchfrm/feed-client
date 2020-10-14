import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import PostsPage from '@/app/PostsPage'

const headerConfig = {
  text: 'review posts',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <PostsPage />
  </BasePage>
)

export default testPageReady('app')(Page)
