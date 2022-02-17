import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from '@/app/Dropdown'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsHeaderMenu = ({
  hasStartedSpending,
  isLast30Days,
  dateFrom,
  dateTo,
  setResultsType,
  resultsType,
  setIsLoading,
}) => {
  const handleItemClick = (type) => {
    // Don't do anything if we're already on the selected results type
    if (type === resultsType) {
      return
    }
    setIsLoading(true)
    setResultsType(type)
  }

  return (
    <Dropdown
      items={['organic', 'paid']}
      handleItemClick={handleItemClick}
      buttonClassName="w-full xs:w-auto px-4 py-3 mb-6 sm:mb-0 rounded-button bg-grey-1 text-left"
      disabled={!hasStartedSpending}
    >
      <MarkdownText markdown={copy.headerMenuText(resultsType, isLast30Days, dateFrom, dateTo)} className="mb-0" />
    </Dropdown>
  )
}

ResultsHeaderMenu.propTypes = {
  hasStartedSpending: PropTypes.bool.isRequired,
  isLast30Days: PropTypes.bool.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  setResultsType: PropTypes.func.isRequired,
  resultsType: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}

export default ResultsHeaderMenu
