import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import TournamentsContent from '@/app/TournamentsContent'

const headerConfig = {
  text: 'results',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    noArtistHeader={headerConfig}
    artistRequired
    staticPage
  >
    <TournamentsContent />
  </BasePage>
)

export default testPageReady('app')(Page)
