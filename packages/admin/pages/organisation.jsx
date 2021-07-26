import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganisationsLoader from '@/admin/OrganisationsLoader'

const Organisation = ({ router: { query } }) => {
  const { orgId } = query
  return (
    <BasePage
      headerConfig="organisation"
      staticPage
    >
      {orgId ? <OrganisationsLoader orgId={orgId} /> : 'No ID'}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organisation))
