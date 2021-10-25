import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import OrganisationsLoader from '@/admin/OrganisationsLoader'

const Organisation = ({ router: { query } }) => {
  const { id } = query
  return (
    <BasePage
      header="organisation"
      staticPage
    >
      {id ? <OrganisationsLoader id={id} /> : 'No ID'}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Organisation))
