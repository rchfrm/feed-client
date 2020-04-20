import BasePage from '../../components/BasePage'
import FaqContent from '../../components/FaqContent'

const header = {
  heading: 'FAQs',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <FaqContent />
  </BasePage>
)

export default Page
