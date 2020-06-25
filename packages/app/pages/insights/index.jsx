import BasePage from '@/app/BasePage'
import testPageReady from '@/app/hoc/testPageReady'
import InsightsContent from '@/app/InsightsContent'

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
