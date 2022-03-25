import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import GetStartedContent from '@/app/GetStartedContent'

const headerConfig = {
  text: 'set-up',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
    hasNoProfilesPage
  >
    <GetStartedContent />
  </BasePage>
)

export default testPageReady('app')(Page)
