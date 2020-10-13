import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import PostsContent from '@/app/PostsContent'

import { PostsContextProvider } from '@/app/contexts/PostsContext'

const headerConfig = {
  text: 'review posts',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <PostsContextProvider>
      <PostsContent />
    </PostsContextProvider>
  </BasePage>
)

export default testPageReady('app')(Page)
