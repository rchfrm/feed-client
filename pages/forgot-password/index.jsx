import BasePage from '../../components/BasePage'
import ForgotPasswordContent from '../../components/ForgotPasswordContent'

const headerConfig = {
  text: 'forgotten password',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <ForgotPasswordContent />
  </BasePage>
)

export default Page
