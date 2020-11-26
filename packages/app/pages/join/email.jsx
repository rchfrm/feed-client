import BasePage from '@/app/BasePage'
import SignupPage from '@/app/SignupPageContent'

const headerConfig = {
  text: 'sign up',
}

const page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
    authPage
  >
    <SignupPage showEmailSignup />
  </BasePage>
)


export default page
