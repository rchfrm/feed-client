import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import PostsContent from '@/app/PostsContent'

const headerConfig = {
  text: 'posts',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
    hasNoProfilesPage
  >
    <PostsContent />
  </BasePage>
)

export default testPageReady('app')(Page)
