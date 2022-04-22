import React from 'react'
import PropTypes from 'prop-types'

import DataDetails from '@/admin/elements/DataDetails'
import TournamentWinner from '@/admin/TournamentWinner'
import TournamentAds from '@/admin/TournamentAds'
import TournamentLink from '@/admin/TournamentLink'

const propsToDisplay = [
  'status',
  'is_latest',
  'created_at',
  'start_time',
  'stop_time',
  'campaign_id',
  'campaign_name',
  'platform',
  'adset_id',
  'adset_name',
  'daily_budget',
  'budget_remaining',
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
        <div className={singleTournament ? 'grid grid-cols-12 gap-y-8 sm:gap-x-4' : ''}>
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
              <TournamentLink
                artistId={artistId}
                campaignId={tournament.campaign_id}
                adsetId={tournament.adset_id}
                tournamentId={tournament.id}
                buttonText="Go to tournament"
                buttonClass="w-48"
              />
            </p>
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
