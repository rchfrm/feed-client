import React from 'react'
// import PropTypes from 'prop-types'

import TournamentsAudienceFilters from '@/app/TournamentsAudienceFilters'
import TournamentsTypeFilters from '@/app/TournamentsTypeFilters'

import * as tournamentHelpers from '@/helpers/tournamentHelpers'

const TournamentsContent = () => {
  const { audienceTypes, tournamentTypes } = tournamentHelpers
  const [currentAudienceType, setCurrentAudienceType] = React.useState(audienceTypes[0].id)
  const [currentTournamentType, setCurrentTournamentType] = React.useState(tournamentTypes[0].id)
  // Set current tournament type to posts if selecting cold audience
  React.useEffect(() => {
    if (currentAudienceType === 'entice_engage') {
      setCurrentTournamentType(tournamentTypes[0].id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudienceType])
  return (
    <div>
      {/* AUDIENCE FILTERS */}
      <TournamentsAudienceFilters
        audienceTypes={audienceTypes}
        currentAudienceType={currentAudienceType}
        setCurrentAudienceType={setCurrentAudienceType}
      />
      {/* TOURNAMENT TYPE FILTERS */}
      <TournamentsTypeFilters
        tournamentTypes={tournamentTypes}
        currentTournamentType={currentTournamentType}
        setCurrentTournamentType={setCurrentTournamentType}
        currentAudienceType={currentAudienceType}
      />
    </div>
  )
}

// TournamentsContent.propTypes = {

// }

export default TournamentsContent
