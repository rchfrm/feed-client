import BasePage from '../../components/BasePage'
import FaqContent from '../../components/FaqContent'

const headerConfig = {
  text: 'FAQs',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <FaqContent />
  </BasePage>
)

export default Page
