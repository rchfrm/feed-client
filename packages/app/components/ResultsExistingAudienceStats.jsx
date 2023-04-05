import React from 'react'
import PropTypes from 'prop-types'

import ResultsExistingAudienceChart from '@/app/ResultsExistingAudienceChart'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'

import MarkdownText from '@/elements/MarkdownText'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsExistingAudienceStats = ({ data }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartData, chartType } = data
  const isMainChart = chartType === 'main'
  const mainValue = isMainChart
    ? `${chartData.adsReachProportion}%`
    : abbreviateNumber(chartData.find((o) => o.type === 'curr')?.value)

  return (
    <div className="flex sm:flex-col items-center justify-between">
      <div className="w-full p-3 bg-gradient-5">
        <p className="mb-0 text-sm sm:text-center">Step 2</p>
        <p className="mb-0 font-bold sm:text-center">Nurture</p>
      </div>
      <div className="p-6">
        <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
          <MarkdownText markdown={data.copy || ''} className="mb-6 sm:mb-0 sm:text-center" />
        </div>
        <div className="flex flex-column items-center justify-center">
          <p className="text-3xl mb-1 sm:text-6xl text-center font-bold">
            {mainValue}
          </p>
          <p className="hidden sm:block text-xs mb-0 sm:mb-5">of your audience reached</p>
        </div>
        {isMainChart ? (
          <ResultsExistingAudienceChart data={chartData} />
        ) : (
          <ResultsFallbackChart data={chartData} color={brandColors.gradient[7].dark} />
        )}
      </div>
    </div>
  )
}

ResultsExistingAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsExistingAudienceStats.defaultProps = {
}

export default ResultsExistingAudienceStats
