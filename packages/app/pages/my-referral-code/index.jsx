import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import ReferralCodeContent from '@/app/ReferralCodeContent'

const headerConfig = {
  text: 'referrals',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <ReferralCodeContent />
  </BasePage>
)

export default testPageReady('app')(Page)
