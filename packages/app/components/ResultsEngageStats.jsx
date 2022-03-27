import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsEngageStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { value, percentile, quartile, copy } = data

  return (
    <>
      <p className="font-bold text-xl sm:text-center">{quartile ? `${quartile.copy} engagement` : 'Engagement'}</p>
      <div className="flex sm:flex-col items-center justify-between mb-6 sm:mb-0">
        <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
          <MarkdownText
            markdown={copy}
            className="mb-0 sm:text-center"
          />
        </div>
        <p
          className="text-3xl ml-2 mb-0 sm:text-6xl sm:ml-0 sm:mb-5 text-center font-bold"
          style={{ color: brandColors.green }}
        >
          {value.toFixed(1)}%
        </p>
      </div>
      <ResultsPercentileChart
        percentile={percentile}
        quartile={quartile}
        color={brandColors.green}
      />
    </>
  )
}

ResultsEngageStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsEngageStats.defaultProps = {
}

export default ResultsEngageStats
