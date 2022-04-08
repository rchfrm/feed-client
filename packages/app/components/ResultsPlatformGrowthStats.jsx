import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart'
import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'
import PlusIcon from '@/icons/PlusIcon'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsPlatformGrowthStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartType, chartData, copy } = data
  const currValue = Array.isArray(chartData) ? chartData.find((o) => o.type === 'curr')?.value : chartData.currValue
  const { percentile, quartile } = chartData
  const isAbsoluteGrowthChart = chartType === 'main'
  const isPercentileChart = chartType === 'fallback'

  return (
    <>
      <div className="flex sm:flex-col items-center justify-between">
        <div>
          <p className="text-xl sm:text-center">Step 3: <strong>Growth</strong></p>
          <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
            <MarkdownText
              markdown={copy || ''}
              className="mb-6 sm:mb-0 sm:text-center"
            />
          </div>
        </div>
        <div className="flex flex-column">
          <div className="flex justify-center items-center">
            <PlusIcon className="h-4 w-4 sm:h-8 sm:w-8 mr-1" fill={brandColors.instagram.bg} />
            <p
              className="text-3xl mb-1 sm:text-6xl text-center font-bold"
              style={{ color: brandColors.instagram.bg }}
            >
              {abbreviateNumber(currValue)}
            </p>
          </div>
          <p className="hidden sm:block text-xs mb-0 sm:mb-8">New people engaged with your posts</p>
        </div>
      </div>
      {isAbsoluteGrowthChart && (
        <ResultsAbsoluteChart
          data={chartData}
          color={brandColors.instagram.bg}
          icon="arrow"
        />
      )}
      {isPercentileChart && (
        <ResultsPercentileChart
          percentile={percentile}
          quartile={quartile}
          color={brandColors.instagram.bg}
        />
      )}
    </>
  )
}

ResultsPlatformGrowthStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsPlatformGrowthStats.defaultProps = {
}

export default ResultsPlatformGrowthStats
