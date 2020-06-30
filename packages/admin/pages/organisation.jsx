import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganisationLoader from '@/admin/OrganisationLoader'

const Organisation = ({ router: { query } }) => {
  const { orgId } = query
  return (
    <BasePage
      headerConfig="organistion"
      staticPage
    >
      {orgId ? <OrganisationLoader orgId={orgId} /> : 'No ID'}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organisation))
