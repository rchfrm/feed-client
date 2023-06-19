import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import CampaignsOverviewLoader from '@/app/CampaignsOverviewLoader'

const headerConfig = {
  text: 'campaigns',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
  >
    <CampaignsOverviewLoader />
  </BasePage>
)

export default testPageReady('app')(Page)
