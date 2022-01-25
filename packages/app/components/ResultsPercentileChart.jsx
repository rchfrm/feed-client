import React from 'react'

import ResultsPercentileChartQuartile from '@/app/ResultsPercentileChartQuartile'

const ResultsPercentileChart = ({ color }) => {
  return (
    <>
      <div className="relative flex w-full h-4 mb-4">
        {[...Array(4)].map((_, index) => (
          <ResultsPercentileChartQuartile
            key={index}
            isActive={index === 1}
            isFirstQuartile={index === 0}
            isLastQuartile={index === 3}
            color={color}
          />
        ))}
      </div>
      <p className="text-xs">Room to improve, but better than 21% of others</p>
    </>
  )
}

ResultsPercentileChart.propTypes = {
}

ResultsPercentileChart.defaultProps = {
}

export default ResultsPercentileChart
