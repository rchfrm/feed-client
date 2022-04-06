import React from 'react'
import PropTypes from 'prop-types'

import ResultsAbsoluteChart from '@/app/ResultsAbsoluteChart'
import ResultsFallbackChart from '@/app/ResultsFallbackChart'
import ResultsConversionsOptimisationEventsChart from '@/app/ResultsConversionsOptimisationEventsChart'

import MarkdownText from '@/elements/MarkdownText'

import { abbreviateNumber, formatCurrency } from '@/helpers/utils'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import brandColors from '@/constants/brandColors'

const ResultsConversionStats = ({ data, currency }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { chartType, isPurchase, chartData, copy } = data
  const currValue = chartData.find((o) => o.type === 'curr').value
  const isMainChart = chartType === 'main'
  const isFallbackChart = chartType === 'fallback'
  const isOptimisationEventsChart = chartType === 'optimisationEvents'

  return (
    <>
      <div className="flex sm:flex-col items-center justify-between">
        <div>
          <p className="text-xl sm:text-center">Step 3: <strong>{copy?.title || 'Sales'}</strong></p>
          <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
            <MarkdownText
              markdown={copy.description || ''}
              className="mb-6 sm:mb-0 sm:text-center"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p
            className="text-3xl mb-0 sm:text-6xl sm:mb-5 text-center font-bold"
            style={{ color: brandColors.instagram.bg }}
          >
            {isPurchase ? formatCurrency(currValue, currency) : abbreviateNumber(currValue)}
          </p>
        </div>
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
    </>
  )
}

ResultsConversionStats.propTypes = {
  data: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

ResultsConversionStats.defaultProps = {
}

export default ResultsConversionStats
