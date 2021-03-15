import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ConnectProfilesLoader from '@/app/ConnectProfilesLoader'

const headerConfig = {
  text: 'continue sign up',
  punctuation: ',',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <ConnectProfilesLoader isSignupStep />
  </BasePage>
)

export default testPageReady('app')(Page)
