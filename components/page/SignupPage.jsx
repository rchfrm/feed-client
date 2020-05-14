import BasePage from '../BasePage'
import SignupPageContent from '../SignupPageContent'

const headerConfig = {
  text: 'sign up',
}

const page = () => (
  <BasePage headerConfig={headerConfig}>
    <SignupPageContent />
  </BasePage>
)


export default page
