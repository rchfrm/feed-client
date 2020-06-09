import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import InsightsContent from '@/InsightsContent'

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
