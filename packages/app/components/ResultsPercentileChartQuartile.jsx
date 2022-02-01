import React from 'react'
import PropTypes from 'prop-types'

const ResultsPercentileChartQuartile = ({
  isActive,
  isFirstQuartile,
  isLastQuartile,
  color,
}) => {
  return (
    <div
      className="w-1/4 h-full"
      style={{
        marginLeft: '2px',
        marginRight: '2px',
      }}
    >
      <div
        className={[
          'w-full h-full mb-1',
          'border-solid border-t-2 border-b-2',
          isFirstQuartile ? 'border-l-2 rounded-l-full' : null,
          isLastQuartile ? 'border-r-2 rounded-r-full' : null,
        ].join(' ')}
        style={{
          borderColor: color,
          backgroundColor: isActive ? color : 'none',
        }}
      />
      {isActive && (
        <span
          className="w-0 h-0 block mx-auto border-4 border-solid border-transparent"
          style={{ borderBottom: '6px solid black' }}
        />
      )}
    </div>
  )
}

ResultsPercentileChartQuartile.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isFirstQuartile: PropTypes.bool.isRequired,
  isLastQuartile: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
}

ResultsPercentileChartQuartile.defaultProps = {
}

export default ResultsPercentileChartQuartile
