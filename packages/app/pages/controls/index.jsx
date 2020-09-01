import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import CboContent from '@/app/CboContent'

import { CboContextProvider } from '@/app/contexts/CboContext'

const headerConfig = {
  text: 'campaign settings',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <CboContextProvider>
      <CboContent />
    </CboContextProvider>
  </BasePage>
)

export default testPageReady('app')(Page)
