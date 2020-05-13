import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import InsightsContent from '../../components/InsightsContent'

const headerConfig = {
  text: 'insights',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <InsightsContent />
  </BasePage>
)

export default TestPageReady(Page)
