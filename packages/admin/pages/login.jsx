import BasePage from '@/admin/BasePage'
import LoginPageContent from '@/LoginPageContent'

const page = () => (
  <BasePage
    headerConfig="login"
    staticPage
    authPage
  >
    <LoginPageContent
      showEmailLogin
    />
  </BasePage>
)


export default page
