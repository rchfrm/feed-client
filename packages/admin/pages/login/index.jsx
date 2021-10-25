// * ADMIN VERSION

import BasePage from '@/admin/BasePage'
import LoginPageContent from '@/admin/LoginPageContent'

const page = () => (
  <BasePage
    header="login"
    staticPage
    authPage
  >
    <LoginPageContent />
  </BasePage>
)


export default page
