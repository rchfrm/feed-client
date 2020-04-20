import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import ResultsLoader from '../../components/ResultsLoader'

const header = {
  heading: 'results',
}

const Page = () => (
  <BasePage
    header={header}
    noArtistHeader={header}
    artistRequired
  >
    <ResultsLoader />
  </BasePage>
)

export default TestPageReady(Page)
