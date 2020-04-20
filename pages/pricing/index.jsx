import BasePage from '../../components/BasePage'
import PricingPageContent from '../../components/PricingPageContent'

const header = {
  heading: 'pricing',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <PricingPageContent />
  </BasePage>
)

export default Page
