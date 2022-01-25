import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import ResultsHeaderMenu from '@/app/ResultsHeaderMenu'
import ResultsSpendingPausedWarning from '@/app/ResultsSpendingPausedWarning'

const ResultsHeader = ({ data, resultsType, setResultsType }) => {
  const { dateRange } = data
  const yesterday = moment().subtract(1, 'day')
  const isLast30Days = moment(dateRange.to).isSame(yesterday, 'day')
  const dateFrom = moment(dateRange.from).format('DD MMM')
  const dateTo = moment(dateRange.to).format('DD MMM')

  return (
    <div className="flex flex-column sm:flex-row justify-between sm:items-center mb-6 sm:mb-12">
      <ResultsHeaderMenu
        isLast30Days={isLast30Days}
        dateFrom={dateFrom}
        dateTo={dateTo}
        setResultsType={setResultsType}
        resultsType={resultsType}
      />
      {resultsType === 'paid' && <ResultsSpendingPausedWarning />}
    </div>
  )
}

ResultsHeader.propTypes = {
  resultsType: PropTypes.string.isRequired,
}

export default ResultsHeader
