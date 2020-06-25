import BasePage from '@/app/BasePage'
import testPageReady from '@/app/hoc/testPageReady'
import ConnectAccountsLoader from '@/app/ConnectAccountsLoader'

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
