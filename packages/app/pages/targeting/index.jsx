import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import TargetingContent from '@/app/TargetingContent'

import { TargetingContextProvider } from '@/app/contexts/TargetingContext'

const headerConfig = {
  text: 'campaign settings',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
  >
    <TargetingContextProvider>
      <TargetingContent />
    </TargetingContextProvider>
  </BasePage>
)

export default testPageReady('app')(Page)
