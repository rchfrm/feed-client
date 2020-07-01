import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import DataDetails from '@/admin/elements/DataDetails'
import CopyTextButton from '@/elements/CopyTextButton'
import TournamentWinner from '@/admin/TournamentWinner'
import TournamentAd from '@/admin/TournamentAd'

import * as ROUTES from '@/admin/constants/routes'

const propsToDisplay = [
  'status',
  'is_latest',
  'created_at',
  'start_time',
  'stop_time',
  'campaign_id',
  'adset_id',
]

const TournamentOverview = ({
  tournament,
  artistId,
  listView,
  className,
}) => {
  const ads = React.useMemo(() => {
    return Object.entries(tournament.ads).map(([id, props]) => {
      return {
        ...props,
        id,
      }
    })
  // eslint-disable-next-line
  }, [])
  // Get the ID of the winning AD
  const { winner } = tournament
  const winningAdId = winner ? winner.ad.path.split('/').pop() : ''
  return (
    <div data-name="TournamentOverview" className={['mb-8', className].join(' ')}>
      <h3><strong>{tournament.id}</strong></h3>
      <DataDetails propsToDisplay={propsToDisplay} data={tournament} />
      {/* WINNER */}
      {tournament.winner && (
        <TournamentWinner winner={winner} winningAdId={winningAdId} />
      )}
      {/* Link to tournament page */}
      {listView && (
        <>
          <p>
            <Link href={{ pathname: ROUTES.TOURNAMENT,
              query: {
                artistId,
                campaignId: tournament.campaign_id,
                adsetId: tournament.adset_id,
                tournamentId: tournament.id,
              },
            }}
            >
              <a className="button button--black button--small w-48">
                <strong className="button--innerText">Go to tournament</strong>
              </a>
            </Link>
          </p>
          {/* <div className="mt-3 mb-5">
            <CopyTextButton text={tournament.id} />
          </div> */}
        </>
      )}
      {/* ADS */}
      {!listView && <h4>The ads</h4>}
      {!listView && (
        ads.map((ad) => {
          const winner = ad.id === winningAdId
          return <TournamentAd key={ad.id} ad={ad} winner={winner} />
        })
      )}
    </div>
  )
}

TournamentOverview.propTypes = {
  tournament: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  listView: PropTypes.bool,
  className: PropTypes.string,
}

TournamentOverview.defaultProps = {
  listView: false,
  className: '',
}


export default TournamentOverview
