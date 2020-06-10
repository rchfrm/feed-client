import BasePage from '@/BasePage'
import testPageReady from '@/hoc/testPageReady'
import BudgetContent from '@/BudgetContent'

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

export default testPageReady(Page)
