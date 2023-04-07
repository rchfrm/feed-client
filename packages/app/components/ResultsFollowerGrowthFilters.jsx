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
    <>
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
      {hasInstagramGrowthObjective && (
        <>
          <Select
            name="datasource"
            handleChange={handleChange}
            options={dataSourceOptions}
            selectedValue={dataSourceName}
          />
          {breakdownOptions.length > 0 && (
            <Select
              name="breakdown"
              handleChange={handleChange}
              options={breakdownOptions}
              selectedValue={breakdownBy}
              loading={isLoading}
            />
          )}
        </>
      )}
    </>
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
