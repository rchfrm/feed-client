import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import InsightsContent from '../../components/InsightsContent'

const Page = () => (
  <BasePage
    artistRequired
  >
    <InsightsContent />
  </BasePage>
)

export default TestPageReady(Page)
