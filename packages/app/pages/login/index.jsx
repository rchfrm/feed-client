import BasePage from '@/app/BasePage'
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
    <LoginPageContent packageType="app" />
  </BasePage>
)

export default page
