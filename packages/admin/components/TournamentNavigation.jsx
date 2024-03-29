import React from 'react'
import PropTypes from 'prop-types'

import TournamentLink from '@/admin/TournamentLink'

const TournamentNavigation = ({ artistId, nextTournament, previousTournament }) => {
  return (
    <nav className="mt-10">
      {/* Next / Prev buttons */}
      {(nextTournament || previousTournament) && (
        <div className="flex justify-between pb-4">
          {/* Previous */}
          {previousTournament && (
            <TournamentLink
              artistId={artistId}
              campaignId={previousTournament.campaign_id}
              adsetId={previousTournament.adset_id}
              tournamentId={previousTournament.tournament_id}
              buttonText="← Previous"
              buttonClass="w-48 mr-4"
            />
          )}
          {/* NEXT */}
          {nextTournament && (
            <TournamentLink
              artistId={artistId}
              campaignId={nextTournament.campaign_id}
              adsetId={nextTournament.adset_id}
              tournamentId={nextTournament.tournament_id}
              buttonText="Next →"
              buttonClass="w-48 ml-4"
            />
          )}
        </div>
      )}
      {/* Back to tournament button */}
      <div className="mt-5">
        <TournamentLink
          artistId={artistId}
          buttonText="Back to tournaments"
          buttonClass="w-full"
          overviewLink
        />
      </div>
    </nav>
  )
}

TournamentNavigation.propTypes = {
  artistId: PropTypes.string.isRequired,
  nextTournament: PropTypes.object,
  previousTournament: PropTypes.object,
}

TournamentNavigation.defaultProps = {
  nextTournament: null,
  previousTournament: null,
}


export default TournamentNavigation
