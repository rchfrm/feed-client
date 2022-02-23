import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import ResultsHeaderMenu from '@/app/ResultsHeaderMenu'
import ResultsSpendingPausedWarning from '@/app/ResultsSpendingPausedWarning'

const ResultsHeader = ({
  hasStartedSpending,
  isSpendingPaused,
  dateRange,
  resultsType,
  setResultsType,
  setIsLoading,
}) => {
  const yesterday = moment().subtract(1, 'day')
  const isLast30Days = moment(dateRange.to).isSame(yesterday, 'day') || resultsType === 'organic'
  const dateFrom = dateRange.from && moment(dateRange.from).format('DD MMM')
  const dateTo = dateRange.to && moment(dateRange.to).format('DD MMM')

  const shouldShowSpendingPausedWarning = hasStartedSpending && isSpendingPaused

  return (
    <div className="flex flex-column sm:flex-row justify-between sm:items-center mb-6 sm:mb-12">
      <ResultsHeaderMenu
        hasStartedSpending={hasStartedSpending}
        isLast30Days={isLast30Days}
        dateFrom={dateFrom}
        dateTo={dateTo}
        setResultsType={setResultsType}
        resultsType={resultsType}
        setIsLoading={setIsLoading}
      />
      {shouldShowSpendingPausedWarning && <ResultsSpendingPausedWarning />}
    </div>
  )
}

ResultsHeader.propTypes = {
  hasStartedSpending: PropTypes.bool.isRequired,
  isSpendingPaused: PropTypes.bool.isRequired,
  dateRange: PropTypes.object,
  resultsType: PropTypes.string.isRequired,
  setResultsType: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}

ResultsHeader.defaultProps = {
  dateRange: {
    from: null,
    to: null,
  },
}

export default ResultsHeader
