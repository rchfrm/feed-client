import React from 'react'
import PropTypes from 'prop-types'

const ResultsFollowerGrowthFiltersPeriod = ({
  period,
  setPeriod,
}) => {
  const periods = [
    {
      title: 'All time',
      value: 'all',
    },
    {
      title: 'Latest campaign',
      value: 'campaign',
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
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p className="text-xs mb-2">Filter by</p>
        <div className="inline-flex mb-6 rounded-dialogue overflow-hidden text-sm text-grey-dark bg-offwhite">
          {periods.map(({ title, value }) => (
            <button
              key={value}
              onClick={() => onClick(value)}
              className={[
                'py-1 px-3 font-bold',
                period === value ? 'text-black bg-green' : null,
              ].join(' ')}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

ResultsFollowerGrowthFiltersPeriod.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersPeriod