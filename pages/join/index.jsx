import BasePage from '@/BasePage'
import SignupPageContent from '@/SignupPageContent'

const headerConfig = {
  text: 'sign up',
}

const page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
    authPage
  >
    <SignupPageContent />
  </BasePage>
)


export default page
