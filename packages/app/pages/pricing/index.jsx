import BasePage from '@/app/BasePage'
import PricingPageContent from '@/app/PricingPageContent'

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
