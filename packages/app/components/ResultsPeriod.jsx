import React from 'react'
import PropTypes from 'prop-types'

const ResultsPeriod = ({ isLast30Days, dateFrom, dateTo }) => {
  return (
    <div className="inline-block px-4 py-3 mb-6 sm:mb-0 rounded-button bg-grey-1">
      {isLast30Days ? (
        <span>In the last <strong>30 days</strong></span>
      ) : (
        <span>
          <strong>{dateFrom}</strong> to <strong>{dateTo}</strong>
        </span>
      )}
    </div>
  )
}

ResultsPeriod.propTypes = {
  isLast30Days: PropTypes.bool.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
}

export default ResultsPeriod
