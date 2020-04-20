import BasePage from '../components/BasePage'
import TestPageReady from '../components/TestPageReady'
import PostsLoader from '../components/PostsLoader'

const noArtistHeader = {
  heading: 'Your posts',
}

const Page = () => (
  <BasePage artistRequired noArtistHeader={noArtistHeader}>
    <PostsLoader />
  </BasePage>
)


export default TestPageReady(Page)
