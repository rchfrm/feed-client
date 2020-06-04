import BasePage from '@/BasePage'
import LoginPageContent from '@/LoginPageContent'

const headerConfig = {
  text: 'log in',
}

const page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
    authPage
  >
    <LoginPageContent />
  </BasePage>
)


export default page
