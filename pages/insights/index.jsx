import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import InsightsLoader from '../../components/InsightsLoader'

const header = {
  heading: 'insights',
}

const Page = () => (
  <BasePage
    header={header}
    noArtistHeader={header}
    artistRequired
  >
    <InsightsLoader />
  </BasePage>
)

export default TestPageReady(Page)
