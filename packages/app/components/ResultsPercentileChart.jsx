import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChartQuartile from '@/app/ResultsPercentileChartQuartile'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsPercentileChart = ({ percentile, quartile, color }) => {
  return (
    <>
      <div className="relative flex w-full h-4 mb-4">
        {[...Array(4)].map((_, index) => (
          <ResultsPercentileChartQuartile
            key={index}
            isActive={(index + 1) === quartile.value}
            isFirstQuartile={index === 0}
            isLastQuartile={index === 3}
            color={color}
          />
        ))}
      </div>
      <MarkdownText className="text-xs mr-auto" markdown={copy.quartileDescription(quartile.value, percentile)} />
    </>
  )
}

ResultsPercentileChart.propTypes = {
  percentile: PropTypes.string.isRequired,
  quartile: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
}

ResultsPercentileChart.defaultProps = {
}

export default ResultsPercentileChart
