import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import ResultsHeaderMenu from '@/app/ResultsHeaderMenu'
import ResultsSpendingPausedWarning from '@/app/ResultsSpendingPausedWarning'

const ResultsHeader = ({
  hasStartedSpending,
  dateRange,
  resultsType,
  setResultsType,
  setIsLoading,
}) => {
  const yesterday = moment().subtract(1, 'day')
  const isLast30Days = moment(dateRange.to).isSame(yesterday, 'day') || resultsType === 'organic'
  const dateFrom = moment(dateRange.from).format('DD MMM')
  const dateTo = moment(dateRange.to).format('DD MMM')

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
      {resultsType === 'paid' && <ResultsSpendingPausedWarning />}
    </div>
  )
}

ResultsHeader.propTypes = {
  hasStartedSpending: PropTypes.bool.isRequired,
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
