import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart.jsx'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'

import MarkdownText from '@/elements/MarkdownText'

import { abbreviateNumber } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsConversionStats = ({ data, className }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartData, isMainChart } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const mainValue = isMainChart
    ? chartData[1].value - chartData[0].value
    : currValue

  return (
    <div className={[className].join(' ')}>
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">Sales</p>
      <div className="flex items-center" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={data.copy || ''}
          className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <p
          className="text-6xl font-bold hidden sm:block"
          style={{ color: brandColors.instagram.bg }}
        >
          {abbreviateNumber(mainValue)}
        </p>
      </div>
      {isMainChart ? (
        <ResultsAbsoluteChart data={chartData} color={brandColors.instagram.bg} icon="arrow" />
      ) : (
        <ResultsFallbackChart data={chartData} color={brandColors.blue} />
      )}
    </div>
  )
}

ResultsConversionStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsConversionStats.defaultProps = {
  className: '',
}

export default ResultsConversionStats
