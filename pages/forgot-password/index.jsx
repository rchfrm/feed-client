import BasePage from '@/BasePage'
import ForgotPasswordContent from '@/ForgotPasswordContent'

const headerConfig = {
  text: 'forgotten password',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <ForgotPasswordContent />
  </BasePage>
)

export default Page
