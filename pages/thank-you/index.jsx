import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import ThankYouPage from '../../components/ThankYouPageContent'

const headerConfig = {
  text: 'results',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <ThankYouPage />
  </BasePage>
)

export default TestPageReady(Page)
