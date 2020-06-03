import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
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

export default TestPageReady(Page)
