import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ConnectAccountsLoader from '@/ConnectAccountsLoader'

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
