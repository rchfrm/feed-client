import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import GetStartedContent from '@/app/GetStartedContent'

const headerConfig = {
  text: 'get started..',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <GetStartedContent />
  </BasePage>
)

export default testPageReady('app')(Page)
