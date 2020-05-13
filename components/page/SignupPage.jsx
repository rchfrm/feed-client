import BasePage from '../BasePage'
import SignupPageContent from '../SignupPageContent'

const headerConfig = {
  text: 'log in',
}

const page = () => (
  <BasePage headerConfig={headerConfig}>
    <SignupPageContent />
  </BasePage>
)


export default page
