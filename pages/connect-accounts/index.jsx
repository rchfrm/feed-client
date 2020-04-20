import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import ConnectAccountsLoader from '../../components/ConnectAccountsLoader'

const header = {
  heading: 'connect accounts',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <ConnectAccountsLoader />
  </BasePage>
)

export default TestPageReady(Page)
