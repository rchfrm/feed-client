import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
import ResultsLoader from '../../components/ResultsLoader'

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
