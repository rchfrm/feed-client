import BasePage from '../../components/BasePage'
import SignupPageContent from '../../components/SignupPageContent'

const headerConfig = {
  text: 'sign up',
}

const page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <SignupPageContent showEmailSignup />
  </BasePage>
)


export default page
