import React from 'react'
import PropTypes from 'prop-types'

const ResultsFollowerGrowthFilters = ({ period, setPeriod }) => {
  const periods = [
    {
      title: 'All time',
      value: 'all',
    },
    {
      title: 'Last 30 days',
      value: '30d',
    },
  ]

  const onClick = (value) => {
    setPeriod(value)
  }

  return (
    <>
      <p className="text-xs mb-2">Filter by</p>
      <div className="inline-flex mb-6 rounded-dialogue overflow-hidden text-sm text-grey-dark bg-offwhite">
        {periods.map(({ title, value }) => (
          <button
            key={value}
            onClick={() => onClick(value)}
            className={[
              'py-2 px-3 font-bold',
              period === value ? 'text-black bg-green' : null,
            ].join(' ')}
          >
            {title}
          </button>
        ))}
      </div>
    </>
  )
}

ResultsFollowerGrowthFilters.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFilters
