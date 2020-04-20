import BasePage from '../../components/BasePage'
import ForgotPasswordContent from '../../components/ForgotPasswordContent'

const header = {
  heading: 'forgotten password',
}

const Page = () => (
  <BasePage
    header={header}
  >
    <ForgotPasswordContent />
  </BasePage>
)

export default Page
