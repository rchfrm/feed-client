import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import TournamentsLoader from '@/admin/TournamentsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const Tournaments = ({ router: { pathname, query } }) => {
  const { artistId } = query
  const pageRequiresLoading = !!artistId
  return (
    <BasePage
      header="tournaments"
      staticPage={!pageRequiresLoading}
    >
      {pageRequiresLoading
        ? <TournamentsLoader artistId={artistId} />
        : (
          <PageQuerySetter
            intro="This page requires an Artist ID"
            queries={[
              {
                label: 'Artist ID',
                queryName: 'artistId',
              },
            ]}
            pathname={pathname}
            submitText="Fetch tournaments"
          />
        )}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Tournaments))
