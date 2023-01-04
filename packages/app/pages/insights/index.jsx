import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import InsightsContent from '@/app/InsightsContent'

const headerConfig = {
  text: 'insights',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
    hasSecondaryLinks
  >
    <InsightsContent />
  </BasePage>
)

export default testPageReady('app')(Page)
