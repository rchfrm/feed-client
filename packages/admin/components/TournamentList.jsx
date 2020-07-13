import React from 'react'
import PropTypes from 'prop-types'

import TournamentOverview from '@/admin/TournamentOverview'

const TournamentList = ({ tournaments, artistId, singleTournament }) => {
  return (
    <div className="grid grid-cols-12 sm:col-gap-4 row-gap-10 pt-5">
      {tournaments.map((tournament) => {
        return (
          <TournamentOverview
            key={tournament.id}
            tournament={tournament}
            artistId={artistId}
            singleTournament={singleTournament}
            className={[
              'col-span-12',
              `${!singleTournament ? 'sm:col-span-6' : ''}`,
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}

TournamentList.propTypes = {
  tournaments: PropTypes.array,
  artistId: PropTypes.string.isRequired,
  singleTournament: PropTypes.bool,
}

TournamentList.defaultProps = {
  tournaments: [],
  singleTournament: false,
}


export default TournamentList
