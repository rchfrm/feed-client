import React from 'react'
import PropTypes from 'prop-types'

import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import copy from '@/app/copy/ResultsPageCopy'
import brandColors from '@/constants/brandColors'

const ResultsReachStats = ({ className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const value = 1.2

  return (
    <div className={[className].join(' ')}>
      <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={copy.noSpendReachDescription(value)}
          className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <p
          className="text-6xl font-bold hidden sm:block"
          style={{ color: brandColors.blue }}
        >
          1.2%
        </p>
      </div>
      <ResultsPercentileChart
        color={brandColors.blue}
      />
    </div>
  )
}

ResultsReachStats.propTypes = {
  className: PropTypes.string,
}

ResultsReachStats.defaultProps = {
  className: '',
}

export default ResultsReachStats
