import { withRouter } from 'next/router'
import TournamentsLoader from '@/admin/TournamentsLoader'
import PageIntro from '@/admin/elements/PageIntro'

const Tournaments = ({ router: { query } }) => {
  const { artistId } = query
  return (
    <>
      <PageIntro />
      <TournamentsLoader artistId={artistId} />
    </>
  )
}

export default withRouter(Tournaments)
