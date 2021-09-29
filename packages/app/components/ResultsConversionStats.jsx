import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart.jsx'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'
import ResultsConversionsOptimisationEventsChart from '@/app/ResultsConversionsOptimisationEventsChart'

import MarkdownText from '@/elements/MarkdownText'

import { abbreviateNumber, formatCurrency } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsConversionStats = ({ data, className, currency }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartType, isPurchase, chartData, copy } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const isMainChart = chartType === 'main'
  const isFallbackChart = chartType === 'fallback'
  const isOptimisationEventsChart = chartType === 'optimisationEvents'

  return (
    <div className={[className].join(' ')}>
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">{copy.title}</p>
      <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
        <MarkdownText
          markdown={copy.description || ''}
          className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <p
          className="text-6xl font-bold hidden sm:block"
          style={{ color: brandColors.instagram.bg }}
        >
          {isPurchase ? formatCurrency(currValue, currency) : abbreviateNumber(currValue)}
        </p>
      </div>
      {isMainChart && (
        <ResultsAbsoluteChart
          data={chartData}
          color={brandColors.instagram.bg}
          icon="arrow"
          isPurchase={isPurchase}
          currency={currency}
        />
      )}
      {isFallbackChart && (
        <ResultsFallbackChart
          data={chartData}
          color={brandColors.instagram.bg}
          isPurchase={isPurchase}
          currency={currency}
        />
      )}
      {isOptimisationEventsChart && (
        <ResultsConversionsOptimisationEventsChart data={chartData} />
      )}
    </div>
  )
}

ResultsConversionStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  currency: PropTypes.string.isRequired,
}

ResultsConversionStats.defaultProps = {
  className: '',
}

export default ResultsConversionStats
