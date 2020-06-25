import BasePage from '@/app/BasePage'
import FaqContent from '@/app/FaqContent'

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
