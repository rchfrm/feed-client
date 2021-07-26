import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganisationsLoader from '@/admin/OrganisationsLoader'

const Organisations = () => {
  return (
    <BasePage
      headerConfig="organistions"
      staticPage
    >
      <OrganisationsLoader />
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organisations))
