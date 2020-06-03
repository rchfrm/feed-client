import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import AccountPageLoader from '../../components/AccountPageLoader'

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

export default TestPageReady(Page)
