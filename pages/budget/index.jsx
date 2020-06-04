import BasePage from '../../components/BasePage'
import testPageReady from '../../components/hoc/testPageReady'
import BudgetContent from '../../components/BudgetContent'

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
