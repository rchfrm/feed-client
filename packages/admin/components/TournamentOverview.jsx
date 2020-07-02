import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import DataDetails from '@/admin/elements/DataDetails'
import CopyTextButton from '@/elements/CopyTextButton'
import TournamentWinner from '@/admin/TournamentWinner'
import TournamentAds from '@/admin/TournamentAds'

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
  singleTournament,
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
    <>
      <div data-name="TournamentOverview" className={['mb-2', className].join(' ')}>
        <h3><strong>{tournament.id}</strong></h3>
        <div className={singleTournament ? 'grid grid-cols-12 row-gap-8 sm:col-gap-4' : ''}>
          <DataDetails
            className="col-span-12 sm:col-span-6"
            propsToDisplay={propsToDisplay}
            data={tournament}
          />
          {/* WINNER */}
          {tournament.winner && singleTournament && (
            <TournamentWinner
              className={singleTournament ? 'col-span-12 sm:col-span-6' : 'pt-4'}
              winner={winner}
              winningAdId={winningAdId}
            />
          )}
        </div>
        {/* Link to tournament page */}
        {!singleTournament && (
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
      </div>
      {/* ADS */}
      {singleTournament && (
        <TournamentAds ads={ads} winningAdId={winningAdId} />
      )}
    </>
  )
}

TournamentOverview.propTypes = {
  tournament: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  singleTournament: PropTypes.bool,
  className: PropTypes.string,
}

TournamentOverview.defaultProps = {
  singleTournament: false,
  className: '',
}


export default TournamentOverview
