import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
import ThankYouPage from '../../components/ThankYouPageContent'

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
