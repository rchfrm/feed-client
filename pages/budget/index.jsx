import BasePage from '../../components/BasePage'
import TestPageReady from '../../components/TestPageReady'
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

export default TestPageReady(Page)
