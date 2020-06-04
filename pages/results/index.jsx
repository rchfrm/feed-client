import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ResultsLoader from '@/ResultsLoader'

const headerConfig = {
  text: 'results',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    noArtistHeader={headerConfig}
    artistRequired
  >
    <ResultsLoader />
  </BasePage>
)

export default testPageReady(Page)
