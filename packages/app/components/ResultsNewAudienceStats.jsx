import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'

import MarkdownText from '@/elements/MarkdownText'
import ArrowIcon from '@/icons/ArrowIcon'
import PlusIcon from '@/icons/PlusIcon'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsNewAudienceStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartData, chartType } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const prevValue = chartData.find((o) => o.type === 'prev').value
  const isMainChart = chartType === 'main'
  const mainValue = isMainChart
    ? chartData[1].value - chartData[0].value
    : currValue

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex sm:flex-col items-center w-full p-3 bg-gradient-1">
        <p className="mb-0 mr-2 sm:mr-0 sm:text-center text-gradient-1-dark brightness-[50%]">Step 1</p>
        <p className="mb-0 font-bold text-xl sm:text-center text-gradient-1-dark brightness-[50%]">Engage</p>
      </div>
      <div className="py-10 px-8 sm:p-8">
        <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
          <MarkdownText markdown={data.copy || ''} className="mb-6 sm:mb-0 sm:text-center text-gradient-1-dark brightness-[50%]" />
        </div>
        <div className="flex flex-column">
          <div className="flex items-center justify-center">
            {isMainChart ? (
              <PlusIcon className="h-4 w-4 sm:h-8 sm:w-8 mr-1" fill={brandColors.facebook.bg} />
            ) : (
              currValue > prevValue && <ArrowIcon className="h-4 w-4 sm:h-8 sm:w-8 mr-1" fill={brandColors.facebook.bg} direction="up" />
            )}
            <p className="text-3xl mb-1 sm:text-6xl text-center font-bold text-gradient-1-dark brightness-[50%]">
              {abbreviateNumber(mainValue)}
            </p>
          </div>
          <p className="hidden sm:block text-xs mb-0 sm:mb-5 text-center text-gradient-1-dark brightness-[50%]">New people engaged with your posts</p>
        </div>
        {isMainChart ? (
          <ResultsAbsoluteChart data={chartData} color={brandColors.gradient[1].dark} icon="plus" />
        ) : (
          <ResultsFallbackChart data={chartData} color={brandColors.gradient[1].dark} />
        )}
      </div>
    </div>
  )
}

ResultsNewAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsNewAudienceStats.defaultProps = {
}

export default ResultsNewAudienceStats
