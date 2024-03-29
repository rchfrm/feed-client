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
    <div className="flex flex-col items-center justify-between">
      <div className="w-full flex sm:flex-col items-center p-3 bg-gradient-11">
        <p className="mb-0 mr-2 sm:mr-0 sm:text-center text-gradient-11-dark brightness-[50%]">Step 3</p>
        <p className="mb-0 font-bold text-xl sm:text-center text-gradient-11-dark brightness-[50%]">{copy?.title || 'Sales'}</p>
      </div>
      <div className="py-10 px-8 sm:p-8">
        <div className="flex items-top" style={{ minHeight: isDesktopLayout ? '88px' : null }}>
          <MarkdownText
            markdown={copy.description || ''}
            className="mb-6 sm:mb-0 sm:text-center text-gradient-11-dark brightness-[50%]"
          />
        </div>
        <div className="flex flex-column items-center justify-center">
          <p className="text-3xl mb-1 sm:text-6xl text-center font-bold text-gradient-11-dark brightness-[50%]">
            {isPurchase ? formatCurrency(currValue, currency) : abbreviateNumber(currValue)}
          </p>
          <p className="hidden sm:block text-xs mb-0 sm:mb-5 text-gradient-11-dark brightness-[50%]">{isPurchase ? `in ${copy.event}s` : copy.event}</p>
        </div>
        {isMainChart && (
          <ResultsAbsoluteChart
            data={chartData}
            color={brandColors.gradient[11].dark}
            icon="arrow"
            isPurchase={isPurchase}
            currency={currency}
          />
        )}
        {isFallbackChart && (
          <ResultsFallbackChart
            data={chartData}
            color={brandColors.gradient[11].dark}
            isPurchase={isPurchase}
            currency={currency}
          />
        )}
        {isOptimisationEventsChart && (
          <ResultsConversionsOptimisationEventsChart data={chartData} />
        )}
      </div>
    </div>
  )
}

ResultsConversionStats.propTypes = {
  data: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

ResultsConversionStats.defaultProps = {
}

export default ResultsConversionStats
