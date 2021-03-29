import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import BillingContent from '@/app/BillingContent'

import { BillingContextProvider } from '@/app/contexts/BillingContext'

const headerConfig = {
  text: 'billing',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <BillingContextProvider>
      <BillingContent />
    </BillingContextProvider>
  </BasePage>
)

export default testPageReady('app')(Page)
