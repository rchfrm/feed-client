import React from 'react'
import PropTypes from 'prop-types'

import DataDetails from '@/admin/elements/DataDetails'
import TournamentWinner from '@/admin/TournamentWinner'
import TournamentAd from '@/admin/TournamentAd'

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
    <div>
      <h3>Tournament ({tournament.id})</h3>
      <DataDetails propsToDisplay={propsToDisplay} data={tournament} border />
      {/* WINNER */}
      {tournament.winner && (
        <TournamentWinner winner={winner} winningAdId={winningAdId} />
      )}
      {/* ADS */}
      <h4>The ads</h4>
      {ads.map((ad) => {
        const winner = ad.id === winningAdId
        return <TournamentAd key={ad.id} ad={ad} winner={winner} />
      })}
    </div>
  )
}

TournamentOverview.propTypes = {
  tournament: PropTypes.object.isRequired,
}

export default TournamentOverview
