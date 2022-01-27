import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from '@/app/Dropdown'

import { capitalise } from '@/helpers/utils'

const ResultsHeaderMenu = ({
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
      buttonClassName="px-4 py-3 mb-6 sm:mb-0 rounded-button bg-grey-1"
    >
      {isLast30Days ? (
        <span>
          <strong>{capitalise(resultsType)}</strong> insights from the <strong>last 30 days</strong>
        </span>
      ) : (
        <span>
          <strong>{capitalise(resultsType)}</strong> insights from <strong>{dateFrom}</strong> to <strong>{dateTo}</strong>
        </span>
      )}
    </Dropdown>
  )
}

ResultsHeaderMenu.propTypes = {
  isLast30Days: PropTypes.bool.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  setResultsType: PropTypes.func.isRequired,
}

export default ResultsHeaderMenu
