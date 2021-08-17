import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganisationsLoader from '@/admin/OrganisationsLoader'

const Organisations = ({ router: { query } }) => {
  const { id } = query
  return (
    <BasePage
      headerConfig="organistions"
      staticPage
    >
      <OrganisationsLoader id={id} />
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organisations))
