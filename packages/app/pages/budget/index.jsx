import BasePage from '@/app/BasePage'
import testPageReady from '@/hoc/testPageReady'
import BudgetContent from '@/app/BudgetContent'

const headerConfig = {
  text: 'set your budget',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    artistRequired
    staticPage
  >
    <BudgetContent />
  </BasePage>
)

export default testPageReady('app')(Page)
