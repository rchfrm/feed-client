import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import { dataSourceOptions } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthFiltersBreakdown = ({
  dataSourceName,
  setDataSourceName,
  breakdownOptions,
  breakdownBy,
  setBreakdownBy,
  isLoading,
}) => {
  const name = dataSourceOptions.find(({ value }) => value === dataSourceName)?.name
  const handleChange = (e) => {
    const { target: { name, value } } = e

    if (name === 'datasource') {
      setDataSourceName(value)
      return
    }
    setBreakdownBy(value)
  }

  return (
    <div className="flex flex-row text-xs">
      <div>
        <p className="mb-2">Breakdown</p>
        <Select
          name="datasource"
          version="small box"
          handleChange={handleChange}
          options={dataSourceOptions}
          selectedValue={dataSourceName}
          className="w-40 mr-8"
        />
      </div>
      {breakdownOptions.length > 0 && (
        <div>
          <p className="mb-2">{name}</p>
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
  )
}

ResultsFollowerGrowthFiltersBreakdown.propTypes = {
  dataSourceName: PropTypes.string.isRequired,
  setDataSourceName: PropTypes.func.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
  breakdownBy: PropTypes.string.isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdown
