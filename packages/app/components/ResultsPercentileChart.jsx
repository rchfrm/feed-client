import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChartQuartile from '@/app/ResultsPercentileChartQuartile'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsPercentileChart = ({ percentile, quartile, color }) => {
  const { value: quartileValue, position: quartilePosition } = quartile || {}

  return (
    <>
      <div className="relative flex w-full h-7">
        {[...Array(4)].map((_, index) => (
          <ResultsPercentileChartQuartile
            key={index}
            isActive={(index + 1) === quartileValue}
            isFirstQuartile={index === 0}
            isLastQuartile={index === 3}
            color={color}
          />
        ))}
      </div>
      {quartileValue ? (
        <>
          <div className="relative mx-auto mb-1" style={{ width: '98%' }}>
            <div className="relative w-full" style={{ left: `calc(${percentile}% - 10px)` }}>
              <span
                className="w-0 h-0 block mx-auto border-8 border-solid border-transparent absolute"
                style={{ borderBottom: '10px solid #F4F4F4', left: '2px', bottom: '-4px' }}
              />
              <span
                className="w-0 h-0 block mx-auto border-4 border-solid border-transparent absolute"
                style={{ borderBottom: '6px solid black', left: '6px', bottom: '-2px' }}
              />
            </div>
          </div>
          <MarkdownText className="w-full mb-0 text-xs text-gradient-11-dark brightness-[50%]" style={{ textAlign: quartilePosition }} markdown={copy.quartileDescription(quartileValue, percentile)} />
        </>
      ) : (
        <MarkdownText className="mt-4 mx-auto text-center text-xs text-gradient-11-dark brightness-[50%]" markdown={copy.connectAccounts} />
      )}
    </>
  )
}

ResultsPercentileChart.propTypes = {
  percentile: PropTypes.string.isRequired,
  quartile: PropTypes.object,
  color: PropTypes.string.isRequired,
}

ResultsPercentileChart.defaultProps = {
  quartile: null,
}

export default ResultsPercentileChart
