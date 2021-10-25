import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import ArtistsLoader from '@/admin/ArtistsLoader'

const Home = () => {
  return (
    <BasePage
      header="artists"
      staticPage
    >
      <ArtistsLoader />
    </BasePage>
  )
}

export default testPageReady('admin')(Home)
