import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import Posts from '@/app/Posts'

const headerConfig = {
  text: 'ads',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
    hasNoProfilesPage
    hasSecondaryLinks
  >
    <Posts />
  </BasePage>
)

export default testPageReady('app')(Page)
