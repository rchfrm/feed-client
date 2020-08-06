import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import PillOptions from '@/elements/PillOptions'

const TournamentsTypeFilters = ({
  tournamentTypes,
  currentTournamentType,
  setCurrentTournamentType,
  currentAudienceType,
  disabled,
}) => {
  const pillOptions = React.useMemo(() => {
    // Disable stories for Cold audiences
    if (currentAudienceType === 'cold') {
      const storiesIndex = tournamentTypes.findIndex(({ id }) => id === 'stories')
      return produce(tournamentTypes, draftState => {
        draftState[storiesIndex].disabled = true
      })
    }
    return tournamentTypes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudienceType])

  return (
    <PillOptions
      label="Select a tournament type"
      options={pillOptions}
      activeOption={currentTournamentType}
      setActiveOption={setCurrentTournamentType}
      size="large"
      disabled={disabled}
    />
  )
}

TournamentsTypeFilters.propTypes = {
  tournamentTypes: PropTypes.array.isRequired,
  currentTournamentType: PropTypes.string.isRequired,
  setCurrentTournamentType: PropTypes.func.isRequired,
  currentAudienceType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default TournamentsTypeFilters
