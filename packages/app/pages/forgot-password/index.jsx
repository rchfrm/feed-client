import BasePage from '@/app/BasePage'
import ForgotPasswordContent from '@/app/ForgotPasswordContent'

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
