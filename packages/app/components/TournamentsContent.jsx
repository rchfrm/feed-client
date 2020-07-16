import React from 'react'
// import PropTypes from 'prop-types'

import TournamentsAudienceFilters from '@/app/TournamentsAudienceFilters'
import TournamentsTypeFilters from '@/app/TournamentsTypeFilters'

import brandColors from '@/constants/brandColors'

const audienceTypes = [
  {
    id: 'warm',
    title: 'Warm',
    color: brandColors.red,
    activeTextColor: brandColors.white,
  },
  {
    id: 'cool',
    title: 'Cool',
    color: brandColors.soundcloud.bg,
    activeTextColor: brandColors.soundcloud.text,
  },
  {
    id: 'cold',
    title: 'Cold',
    color: brandColors.twitter.bg,
    activeTextColor: brandColors.twitter.text,
  },
]

const tournamentTypes = [
  { id: 'posts', title: 'Posts' },
  { id: 'stories', title: 'Stories' },
]

const TournamentsContent = () => {
  const [currentAudienceType, setCurrentAudienceType] = React.useState(audienceTypes[0].id)
  const [currentTournamentType, setCurrentTournamentType] = React.useState(tournamentTypes[0].id)
  // Set current tournament type to posts if selecting cold audience
  React.useEffect(() => {
    if (currentAudienceType === 'cold') {
      setCurrentTournamentType(tournamentTypes[0].id)
    }
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
