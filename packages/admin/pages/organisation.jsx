import { withRouter } from 'next/router'
import OrganisationLoader from '@/admin/OrganisationLoader'
import PageIntro from '@/admin/elements/PageIntro'

const Organisation = ({ router: { query } }) => {
  const { id } = query
  return (
    <>
      <PageIntro />
      {id && <OrganisationLoader id={id} />}
    </>
  )
}

export default withRouter(Organisation)
