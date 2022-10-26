import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganizationsLoader from '@/admin/OrganizationsLoader'

const Organizations = ({ router: { query } }) => {
  const { id } = query
  return (
    <BasePage
      header="organisations"
      staticPage
    >
      <OrganizationsLoader id={id} />
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organizations))
