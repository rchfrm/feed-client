import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import AccountPageLoader from '../../components/AccountPageLoader'

const headerConfig = {
  text: 'account',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <AccountPageLoader />
  </BasePage>
)

export default TestPageReady(Page)
