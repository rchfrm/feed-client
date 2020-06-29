import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import AccountPageLoader from '@/app/AccountPageLoader'

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

export default testPageReady('app')(Page)
