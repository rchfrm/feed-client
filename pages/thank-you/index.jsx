import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ThankYouPage from '@/ThankYouPageContent'

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

export default testPageReady(Page)
