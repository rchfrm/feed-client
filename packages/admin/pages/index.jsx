import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import AllArtistsLoader from '@/admin/AllArtistsLoader'

const Home = () => {
  return (
    <BasePage
      headerConfig="artists"
      staticPage
    >
      <AllArtistsLoader />
    </BasePage>
  )
}

export default testPageReady('admin')(Home)
