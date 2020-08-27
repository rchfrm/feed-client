import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import CboContent from '@/app/CboContent'

const headerConfig = {
  text: 'campaign settings',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <CboContent />
  </BasePage>
)

export default testPageReady('app')(Page)
