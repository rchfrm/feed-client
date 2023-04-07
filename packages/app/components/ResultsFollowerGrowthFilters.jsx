import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import { dataSourceOptions } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthFilters = ({
  period,
  setPeriod,
  dataSourceName,
  setDataSourceName,
  breakdownOptions,
  breakdownBy,
  setBreakdownBy,
  isLoading,
  hasInstagramGrowthObjective,
}) => {
  const periods = [
    {
      title: 'All time',
      value: 'all',
    },
    {
      title: 'Since latest campaign start',
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

  const handleChange = (e) => {
    const { target: { name, value } } = e

    if (name === 'datasource') {
      setDataSourceName(value)
      return
    }
    setBreakdownBy(value)
  }

  return (
    <div className="flex justify-between">
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
      {hasInstagramGrowthObjective && (
        <div className="flex text-xs">
          <div>
            <p className="mb-2">Breakdown by</p>
            <Select
              name="datasource"
              version="small box"
              handleChange={handleChange}
              options={dataSourceOptions}
              selectedValue={dataSourceName}
              className="w-40 mr-4"
            />
          </div>
          {breakdownOptions.length > 0 && (
            <div>
              <p className="mb-2">Value</p>
              <Select
                name="breakdown"
                version="small box"
                handleChange={handleChange}
                options={breakdownOptions}
                selectedValue={breakdownBy}
                loading={isLoading}
                className="w-40"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ResultsFollowerGrowthFilters.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
  dataSourceName: PropTypes.string.isRequired,
  setDataSourceName: PropTypes.func.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
  breakdownBy: PropTypes.string.isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasInstagramGrowthObjective: PropTypes.bool.isRequired,
}

export default ResultsFollowerGrowthFilters
