import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganizationsLoader from '@/admin/OrganizationsLoader'

const Organization = ({ router: { query } }) => {
  const { id } = query
  return (
    <BasePage
      header="organisation"
      staticPage
    >
      {id ? <OrganizationsLoader id={id} /> : 'No ID'}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organization))
