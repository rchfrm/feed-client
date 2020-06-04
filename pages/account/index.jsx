import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import AccountPageLoader from '@/AccountPageLoader'

const headerConfig = {
  text: 'account details',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <AccountPageLoader />
  </BasePage>
)

export default testPageReady(Page)
