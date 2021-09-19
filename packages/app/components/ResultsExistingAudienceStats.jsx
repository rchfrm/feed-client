import React from 'react'
import PropTypes from 'prop-types'

import ResultsExistingAudienceChart from '@/app/ResultsExistingAudienceChart'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'

import MarkdownText from '@/elements/MarkdownText'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsExistingAudienceStats = ({ data, className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartData, isMainChart } = data
  const mainValue = isMainChart
    ? `${chartData.adsReachProportion}%`
    : abbreviateNumber(chartData.find((o) => o.type === 'curr')?.value)

  return (
    <div className={[className].join(' ')}>
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">Existing audiences</p>
      <div className="flex items-center" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={data.copy || ''}
          className="sm:px-1 mr-auto sm:mr-0 mb-10 sm:mb-0 sm:text-center"
        />
      </div>
      <p
        className="text-center text-6xl font-bold hidden sm:block"
        style={{ color: brandColors.green }}
      >
        {mainValue}
      </p>
      {isMainChart ? (
        <ResultsExistingAudienceChart data={chartData} />
      ) : (
        <ResultsFallbackChart data={chartData} color={brandColors.green} />
      )}
    </div>
  )
}

ResultsExistingAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsExistingAudienceStats.defaultProps = {
  className: '',
}

export default ResultsExistingAudienceStats
