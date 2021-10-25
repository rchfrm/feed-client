import { withRouter } from 'next/router'

import testPageReady from '@/hoc/testPageReady'
import BasePage from '@/admin/BasePage'
import TournamentsLoader from '@/admin/TournamentsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

const Tournament = ({ router: { pathname, query } }) => {
  const { artistId, tournamentId, campaignId, adsetId } = query
  const pageRequiresLoading = !!(artistId && tournamentId && campaignId && adsetId)
  return (
    <BasePage
      header="tournament"
      staticPage={!pageRequiresLoading}
    >
      {pageRequiresLoading ? (
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

export default testPageReady('admin')(withRouter(Tournament))
