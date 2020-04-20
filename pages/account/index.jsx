import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import AccountPageLoader from '../../components/AccountPageLoader'

const header = {
  heading: 'account',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <AccountPageLoader />
  </BasePage>
)

export default TestPageReady(Page)
