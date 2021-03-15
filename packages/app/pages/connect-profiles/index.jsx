import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ConnectProfilesLoader from '@/app/ConnectProfilesLoader'

const headerConfig = {
  text: 'connect profiles',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <ConnectProfilesLoader />
  </BasePage>
)

export default testPageReady('app')(Page)
