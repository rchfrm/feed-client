import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
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

export default testPageReady(Page)
