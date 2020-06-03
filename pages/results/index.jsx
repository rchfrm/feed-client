import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
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

export default TestPageReady(Page)
