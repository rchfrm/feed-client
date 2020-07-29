import BasePage from '@/app/BasePage'

const headerConfig = {
  text: 'Page not found',
}

const Page = () => (
  <BasePage
    headerConfig={headerConfig}
    staticPage
  >
    <div className="text--block">
      <h3>404</h3>
      <p>Sorry, we couldn't find the page you were looking for.</p>
    </div>
  </BasePage>
)

export default Page
