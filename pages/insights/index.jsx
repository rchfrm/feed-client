import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import InsightsContent from '../../components/InsightsContent'

const header = {
  heading: 'insights',
}

const Page = () => (
  <BasePage
    header={header}
    noArtistHeader={header}
    artistRequired
  >
    <InsightsContent />
  </BasePage>
)

export default TestPageReady(Page)
