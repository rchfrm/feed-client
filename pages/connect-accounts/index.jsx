import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import ConnectAccountsLoader from '../../components/ConnectAccountsLoader'

const headerConfig = {
  text: 'connect accounts',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <ConnectAccountsLoader />
  </BasePage>
)

export default TestPageReady(Page)
