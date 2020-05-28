import BasePage from '../../components/BasePage'
import LoginPageContent from '../../components/LoginPageContent'

const headerConfig = {
  text: 'log in',
}

const page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <LoginPageContent showEmailLogin />
  </BasePage>
)


export default page
