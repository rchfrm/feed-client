import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsEngageStats = ({ data, className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { value, percentile, quartile, copy } = data

  return (
    <div className={[className].join(' ')}>
      <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={copy}
          className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <p
          className="text-6xl font-bold hidden sm:block"
          style={{ color: brandColors.green }}
        >
          {value}%
        </p>
      </div>
      <ResultsPercentileChart
        percentile={percentile}
        quartile={quartile}
        color={brandColors.green}
      />
    </div>
  )
}

ResultsEngageStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsEngageStats.defaultProps = {
  className: '',
}

export default ResultsEngageStats
