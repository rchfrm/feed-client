import React from 'react'

const ResultsPercentileChartQuartile = ({
  isActive,
  isFirstQuartile,
  isLastQuartile,
}) => {
  return (
    <span
      className={[
        'w-1/4',
        'border-solid border-t-2 border-b-2 border-green',
        isActive ? 'bg-green' : null,
        isFirstQuartile ? 'border-l-2 rounded-l-full' : null,
        isLastQuartile ? 'border-r-2 rounded-r-full' : null,
      ].join(' ')}
      style={{ marginLeft: '2px', marginRight: '2px' }}
    />
  )
}

ResultsPercentileChartQuartile.propTypes = {
}

ResultsPercentileChartQuartile.defaultProps = {
}

export default ResultsPercentileChartQuartile
