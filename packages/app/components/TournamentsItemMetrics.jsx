import React from 'react'
import PropTypes from 'prop-types'

const TournamentsItemMetrics = ({ adMetrics, isAdPair, className }) => {
  return (
    <div className={[className].join(' ')}>
      METRIXXX
    </div>
  )
}

TournamentsItemMetrics.propTypes = {
  adMetrics: PropTypes.array.isRequired,
  isAdPair: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TournamentsItemMetrics.defaultProps = {
  className: '',
}


export default TournamentsItemMetrics
