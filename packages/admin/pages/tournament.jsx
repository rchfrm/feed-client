import { withRouter } from 'next/router'
import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import TournamentsLoader from '@/admin/TournamentsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const Tournaments = ({ router: { pathname, query } }) => {
  const { artistId, tournamentId, campaignId, adsetId } = query
  return (
    <BasePage
      headerConfig="tournament"
      staticPage
    >
      {artistId && tournamentId && campaignId && adsetId ? (
        <TournamentsLoader
          artistId={artistId}
          campaignId={campaignId}
          adsetId={adsetId}
          tournamentId={tournamentId}
        />
      ) : (
        <PageQuerySetter
          intro="This page is missing some parameters"
          pathname={pathname}
          queries={[
            {
              label: 'Artist ID',
              queryName: 'artistId',
            },
            {
              label: 'Tournament ID',
              queryName: 'tournamentId',
            },
            {
              label: 'Campaign ID',
              queryName: 'campaignId',
            },
            {
              label: 'Ad set ID',
              queryName: 'adsetId',
            },
          ]}
          filledQueries={[artistId, tournamentId, campaignId, adsetId]}
        />
      )}
    </BasePage>
  )
}

export default testPageReady('admin')(withRouter(Tournaments))
