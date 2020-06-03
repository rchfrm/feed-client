import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
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

export default testPageReady(Page)
