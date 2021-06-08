import BasePage from '@/app/BasePage'
import ResetPasswordContent from '@/app/ResetPasswordContent'

const headerConfig = {
  text: 'reset password',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <ResetPasswordContent />
  </BasePage>
)

export default Page
