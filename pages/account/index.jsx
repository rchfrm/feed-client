import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
import AccountPageLoader from '../../components/AccountPageLoader'

const headerConfig = {
  text: 'account details',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <AccountPageLoader />
  </BasePage>
)

export default testPageReady(Page)
