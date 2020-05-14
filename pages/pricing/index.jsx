import BasePage from '../../components/BasePage'
import PricingPageContent from '../../components/PricingPageContent'

const headerConfig = {
  text: 'pricing',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <PricingPageContent />
  </BasePage>
)

export default Page
