import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ConnectAccountsLoader from '@/app/ConnectAccountsLoader'

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

export default testPageReady('app')(Page)
