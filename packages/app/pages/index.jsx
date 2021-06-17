import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import PostsContent from '@/app/PostsContent'

const headerConfig = {
  text: 'review posts',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <PostsContent />
  </BasePage>
)

export default testPageReady('app')(Page)
