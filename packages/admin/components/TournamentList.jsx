import React from 'react'
import PropTypes from 'prop-types'

import AdminGrid from '@/admin/elements/AdminGrid'
import AdminGridItem from '@/admin/elements/AdminGridItem'
import TournamentOverview from '@/admin/TournamentOverview'

const TournamentList = ({ tournaments, artistId, singleTournament }) => {
  return (
    <AdminGrid>
      {tournaments.map((tournament) => {
        return (
          <AdminGridItem key={tournament.id} forceFullWidth={singleTournament}>
            <TournamentOverview
              tournament={tournament}
              artistId={artistId}
              singleTournament={singleTournament}
            />
          </AdminGridItem>
        )
      })}
    </AdminGrid>
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
