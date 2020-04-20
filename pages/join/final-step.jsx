import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import ConnectAccountsLoader from '../../components/ConnectAccountsLoader'

const header = {
  heading: 'continue sign up',
  punctuation: ',',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <ConnectAccountsLoader onSignUp />
  </BasePage>
)

export default TestPageReady(Page)
