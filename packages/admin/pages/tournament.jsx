import { withRouter } from 'next/router'
import Link from 'next/link'

import testPageReady from '@/hoc/testPageReady'
import Button from '@/elements/Button'
import BasePage from '@/admin/BasePage'
import TournamentsLoader from '@/admin/TournamentsLoader'
import PageQuerySetter from '@/admin/PageQuerySetter'

import * as ROUTES from '@/admin/constants/routes'

const Tournaments = ({ router: { pathname, query } }) => {
  const { artistId, tournamentId, campaignId, adsetId } = query
  const pageRequiresLoading = !!(artistId && tournamentId && campaignId && adsetId)
  return (
    <BasePage
      headerConfig="tournament"
      staticPage={!pageRequiresLoading}
    >
      {pageRequiresLoading ? (
        <>
          <TournamentsLoader
            artistId={artistId}
            campaignId={campaignId}
            adsetId={adsetId}
            tournamentId={tournamentId}
          />
          {/* Back to tournament button */}
          <div className="mt-10">
            <Link href={{ pathname: ROUTES.TOURNAMENTS, query: { artistId } }}>
              <Button className="w-full" version="black small" wrapper="a">
                Back to tournaments
              </Button>
            </Link>
          </div>
        </>
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
