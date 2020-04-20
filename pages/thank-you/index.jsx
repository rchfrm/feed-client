import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
import ThankYouPage from '../../components/ThankYouPageContent'

const header = {
  heading: 'results',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <ThankYouPage />
  </BasePage>
)

export default TestPageReady(Page)
