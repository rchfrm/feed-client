import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import MyReferralCodeContent from '@/app/MyReferralCodeContent'

const headerConfig = {
  text: 'my referral code',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <MyReferralCodeContent />
  </BasePage>
)

export default testPageReady('app')(Page)
