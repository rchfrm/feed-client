import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFilterOptions from '@/app/ResultsFollowerGrowthFilterOptions'

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

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between lg:mr-8">
      <div>
        <p className="text-xs mb-2">Filter by</p>
        <ResultsFollowerGrowthFilterOptions
          value={period}
          setValue={setPeriod}
          options={periods}
          className="w-full xxs:w-auto mb-5"
        />
      </div>
    </div>
  )
}

ResultsFollowerGrowthFiltersPeriod.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersPeriod
