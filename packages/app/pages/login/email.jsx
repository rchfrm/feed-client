import BasePage from '@/app/BasePage'
import LoginPageContent from '@/app/LoginPageContent'

const headerConfig = {
  text: 'log in',
}

const page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
    authPage
  >
    <LoginPageContent
      showEmailLogin
    />
  </BasePage>
)


export default page
