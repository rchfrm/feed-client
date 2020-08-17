import React from 'react'
import PropTypes from 'prop-types'

const TournamentsNone = ({ audienceName, tournamentType }) => {
  return (
    <div>
      NONE
    </div>
  )
}

TournamentsNone.propTypes = {
  audienceName: PropTypes.string.isRequired,
  tournamentType: PropTypes.string.isRequired,
}

export default TournamentsNone
