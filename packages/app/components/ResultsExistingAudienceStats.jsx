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
    <div className="flex flex-col items-center justify-between">
      <div className="flex sm:flex-col items-center w-full p-3 bg-gradient-5">
        <p className="mb-0 mr-2 sm:mr-0 sm:text-center text-gradient-5-dark brightness-[50%]">Step 2</p>
        <p className="mb-0 font-bold text-xl sm:text-center text-gradient-5-dark brightness-[50%]">Nurture</p>
      </div>
      <div className="py-10 px-8 sm:p-8">
        <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
          <MarkdownText markdown={data.copy || ''} className="mb-6 sm:mb-0 sm:text-center text-gradient-5-dark brightness-[50%]" />
        </div>
        <div className="flex flex-column items-center justify-center">
          <p className="text-3xl mb-1 sm:text-6xl text-center font-bold text-gradient-5-dark brightness-[50%]">
            {mainValue}
          </p>
          <p className="hidden sm:block text-xs mb-0 sm:mb-5 text-gradient-5-dark brightness-[50%]">of your audience reached</p>
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
