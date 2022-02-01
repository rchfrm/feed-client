import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

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
  const { artist: { start_spending_at } } = React.useContext(ArtistContext)
  const isSpendingArtist = Boolean(start_spending_at)

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
      disabled={!isSpendingArtist}
    >
      {isLast30Days ? (
        <span>
          <span className="font-bold underline">{capitalise(resultsType)}</span> insights, <strong>last 30 days...</strong>
        </span>
      ) : (
        <span>
          <span className="font-bold underline">{capitalise(resultsType)}</span> insights from <strong>{dateFrom}</strong> to <strong>{dateTo}</strong>
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
