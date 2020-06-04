import BasePage from '@/BasePage'
import PricingPageContent from '@/PricingPageContent'

const headerConfig = {
  text: 'pricing',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <PricingPageContent />
  </BasePage>
)

export default Page
