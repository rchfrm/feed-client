import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ThankYouPage from '@/app/ThankYouPageContent'

const headerConfig = {
  text: 'results',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <ThankYouPage />
  </BasePage>
)

export default testPageReady('app')(Page)
