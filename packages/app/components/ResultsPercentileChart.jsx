import React from 'react'

import ResultsPercentileChartQuartile from '@/app/ResultsPercentileChartQuartile'

const ResultsPercentileChart = () => {
  return (
    <>
      <div className="relative flex w-full h-4 mb-3">
        {[...Array(4)].map((_, index) => (
          <ResultsPercentileChartQuartile
            key={index}
            isActive={index === 1}
            isFirstQuartile={index === 0}
            isLastQuartile={index === 3}
          />
        ))}
      </div>
      <span
        className="w-0 h-0 border-4 border-solid border-transparent"
        style={{ borderBottom: '6px solid black' }}
      />
      <span className="px-1 text-xs">Room to improve, but better than 21% of others</span>
    </>
  )
}

ResultsPercentileChart.propTypes = {
}

ResultsPercentileChart.defaultProps = {
}

export default ResultsPercentileChart
