import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart'
import ResultsPercentileChart from '@/app/ResultsPercentileChart'

import MarkdownText from '@/elements/MarkdownText'
import PlusIcon from '@/icons/PlusIcon'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'
import resultsCopy from '@/app/copy/ResultsPageCopy'

const ResultsPlatformGrowthStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartType, chartData, copy } = data
  const currValue = Array.isArray(chartData) ? chartData.find((o) => o.type === 'curr')?.value : chartData.currValue
  const { percentile, quartile } = chartData
  const isAbsoluteGrowthChart = chartType === 'main'
  const isPercentileChart = chartType === 'fallback'

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="w-full flex sm:flex-col items-center p-3 bg-gradient-11">
        <p className="mb-0 mr-2 sm:mr-0 sm:text-center text-gradient-11-dark brightness-[50%]">Step 3</p>
        <p className="mb-0 font-bold text-xl sm:text-center text-gradient-11-dark brightness-[50%]">Grow</p>
      </div>
      <div className="py-10 px-8 sm:p-8">
        <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
          <MarkdownText markdown={copy || ''} className="mb-6 sm:mb-0 sm:text-center text-gradient-11-dark brightness-[50%]" />
        </div>
        <div className="flex flex-column">
          <div className="flex justify-center items-center">
            {currValue > 0 && (
              <PlusIcon
                className="h-4 w-4 sm:h-8 sm:w-8 mr-1"
                style={{ filter: 'brightness(50%)' }}
                fill={brandColors.gradient[11].dark}
              />
            )}
            <p className="text-3xl mb-1 sm:text-6xl text-center font-bold text-gradient-11-dark brightness-[50%]">
              {abbreviateNumber(currValue)}
            </p>
          </div>
          <p className="hidden sm:block text-xs text-center mb-0 sm:mb-5 text-gradient-11-dark brightness-[50%]">New followers</p>
        </div>
        {isAbsoluteGrowthChart && (
          <ResultsAbsoluteChart
            data={chartData}
            color={brandColors.gradient[11].dark}
            icon="plus"
            tooltipTitles={['Organic', 'Paid']}
            tooltipMessage={resultsCopy.platformGrowthTooltip}
          />
        )}
        {isPercentileChart && (
          <ResultsPercentileChart
            percentile={percentile}
            quartile={quartile}
            color={brandColors.gradient[11].dark}
          />
        )}
      </div>
    </div>
  )
}

ResultsPlatformGrowthStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsPlatformGrowthStats.defaultProps = {
}

export default ResultsPlatformGrowthStats
