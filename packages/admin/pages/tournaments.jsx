import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import TournamentsLoader from '@/admin/TournamentsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const Tournaments = ({ router: { pathname, query } }) => {
  const { artistId } = query
  console.log('pathname', pathname)
  return (
    <BasePage
      headerConfig="tournamenmts"
      staticPage
    >
      {artistId ? <TournamentsLoader artistId={artistId} /> : (
        <PageQuerySetter
          intro="This page requires an Artist ID"
          label="Artist ID"
          placeholder="paste an artist ID here"
          pathname={pathname}
          queryName="artistId"
        />
      )}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Tournaments))
