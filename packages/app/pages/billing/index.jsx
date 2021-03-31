import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import BillingContent from '@/app/BillingContent'

const headerConfig = {
  text: 'billing',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <BillingContent />
  </BasePage>
)

export default testPageReady('app')(Page)
