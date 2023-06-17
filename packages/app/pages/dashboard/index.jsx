import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import Dashboard from '@/app/Dashboard'

const headerConfig = {
  text: 'dashboard',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <Dashboard />
  </BasePage>
)

export default testPageReady('app')(Page)
