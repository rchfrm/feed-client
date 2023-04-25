import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import ResultsFollowerGrowthFiltersBreakdownLocation from '@/app/ResultsFollowerGrowthFiltersBreakdownLocation'
import ResultsFollowerGrowthFiltersBreakdownAgeGender from '@/app/ResultsFollowerGrowthFiltersBreakdownAgeGender'
import { dataSourceOptions, instagramDataSources } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthFiltersBreakdown = ({
  dataSourceName,
  setDataSourceName,
  breakdownOptions,
  breakdownBy,
  setBreakdownBy,
  isLoading,
}) => {
  const name = dataSourceOptions.find(({ value }) => value === dataSourceName)?.name
  const shouldShowBreakdown = breakdownOptions.length > 0 && name !== 'All'
  const isLocationBreakdown = dataSourceName === instagramDataSources.country || dataSourceName === instagramDataSources.city

  const handleChange = (e) => {
    const { target: { name, value } } = e

    if (name === 'datasource') {
      setDataSourceName(value)
      return
    }
    setBreakdownBy(value)
  }

  return (
    <div className={[
      'flex flex-col text-xs',
      ! isLocationBreakdown ? 'sm:flex-row' : 'xxs:flex-row',
    ].join(' ')}
    >
      <div>
        <p className="mb-2">Breakdown</p>
        <Select
          name="datasource"
          version="small box"
          handleChange={handleChange}
          options={dataSourceOptions}
          selectedValue={dataSourceName}
          className="w-full xxs:w-40 mr-8 mb-5"
        />
      </div>
      {shouldShowBreakdown && (
        isLocationBreakdown ? (
          <ResultsFollowerGrowthFiltersBreakdownLocation
            name={name}
            breakdownBy={breakdownBy}
            setBreakdownBy={setBreakdownBy}
            breakdownOptions={breakdownOptions}
            handleChange={handleChange}
            loading={isLoading}
          />
        ) : (
          <ResultsFollowerGrowthFiltersBreakdownAgeGender
            setBreakdownBy={setBreakdownBy}
          />
        )
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
