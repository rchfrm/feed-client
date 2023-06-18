import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import CampaignsOverview from '@/app/CampaignsOverview'

const headerConfig = {
  text: 'campaigns',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <CampaignsOverview />
  </BasePage>
)

export default testPageReady('app')(Page)
