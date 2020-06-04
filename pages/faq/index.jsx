import BasePage from '@/BasePage'
import FaqContent from '@/FaqContent'

const headerConfig = {
  text: 'FAQs',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <FaqContent />
  </BasePage>
)

export default Page
