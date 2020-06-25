import BasePage from '@/app/BasePage'
import SignupPageContent from '@/app/SignupPageContent'

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
