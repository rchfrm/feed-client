import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganisationsLoader from '@/admin/OrganisationsLoader'

const Organisations = ({ router: { query } }) => {
  const { orgId } = query
  return (
    <BasePage
      headerConfig="organistions"
      staticPage
    >
      <OrganisationsLoader orgId={orgId} />
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organisations))
