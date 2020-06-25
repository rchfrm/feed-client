import BasePage from '@/admin/BasePage'
import LoginPageContent from '@/LoginPageContent'

const page = () => (
  <BasePage
    headerConfig="login"
  >
    <LoginPageContent showEmailLogin />
  </BasePage>
)


export default page
