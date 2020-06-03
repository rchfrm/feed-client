import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
import ConnectAccountsLoader from '../../components/ConnectAccountsLoader'

const headerConfig = {
  text: 'continue sign up',
  punctuation: ',',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <ConnectAccountsLoader onSignUp />
  </BasePage>
)

export default testPageReady(Page)
