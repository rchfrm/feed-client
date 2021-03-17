import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'

import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'
import ConnectProfilesLoader from '@/app/ConnectProfilesLoader'

const headerConfig = {
  text: 'connect profiles',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <ConnectProfilesLoader className="mb-8" />
    <ConnectProfilesAlreadyConnected />
  </BasePage>
)

export default testPageReady('app')(Page)
