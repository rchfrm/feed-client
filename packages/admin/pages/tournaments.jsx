import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import TournamentsLoader from '@/admin/TournamentsLoader'

const Tournaments = ({ router: { query } }) => {
  const { artistId } = query
  return (
    <BasePage
      headerConfig="tournamenmts"
      staticPage
    >
      {artistId ? <TournamentsLoader artistId={artistId} /> : 'No ID'}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Tournaments))
