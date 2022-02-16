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
    <>
      <div className="flex sm:flex-col items-center justify-between">
        <div>
          <p className="font-bold text-xl sm:text-center">Existing audiences</p>
          <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
            <MarkdownText
              markdown={data.copy || ''}
              className="mb-6 sm:mb-0 sm:text-center"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p
            className="text-3xl mb-0 sm:text-6xl sm:mb-5 text-center font-bold"
            style={{ color: brandColors.green }}
          >
            {mainValue}
          </p>
        </div>
      </div>
      {isMainChart ? (
        <ResultsExistingAudienceChart data={chartData} />
      ) : (
        <ResultsFallbackChart data={chartData} color={brandColors.green} />
      )}
    </>
  )
}

ResultsExistingAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsExistingAudienceStats.defaultProps = {
}

export default ResultsExistingAudienceStats
