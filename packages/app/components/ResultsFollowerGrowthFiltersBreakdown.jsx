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
  const dataSourceOptionName = dataSourceOptions.find(({ value }) => value === dataSourceName)?.name
  const shouldShowBreakdown = breakdownOptions.length > 0 && dataSourceOptionName !== 'All'
  const isLocationBreakdown = dataSourceName === instagramDataSources.country || dataSourceName === instagramDataSources.city

  const handleChange = (e) => {
    const { target: { value } } = e

    setDataSourceName(value)
  }

  return (
    <>
      <div>
        <p className="text-xs mb-2">Breakdown</p>
        <Select
          name="datasource"
          version="small box"
          handleChange={handleChange}
          options={dataSourceOptions}
          selectedValue={dataSourceName}
          className="w-full xxs:w-32 mb-5 text-xs"
        />
      </div>
      {shouldShowBreakdown && (
        isLocationBreakdown ? (
          <ResultsFollowerGrowthFiltersBreakdownLocation
            name="location"
            title={dataSourceOptionName}
            breakdownBy={breakdownBy}
            setBreakdownBy={setBreakdownBy}
            breakdownOptions={breakdownOptions}
            loading={isLoading}
          />
        ) : (
          <ResultsFollowerGrowthFiltersBreakdownAgeGender
            name="age-gender"
            setBreakdownBy={setBreakdownBy}
          />
        )
      )}
    </>
  )
}

ResultsFollowerGrowthFiltersBreakdown.propTypes = {
  dataSourceName: PropTypes.string.isRequired,
  setDataSourceName: PropTypes.func.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
  breakdownBy: PropTypes.object,
  setBreakdownBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsFollowerGrowthFiltersBreakdown.defaultProps = {
  breakdownBy: null,
}

export default ResultsFollowerGrowthFiltersBreakdown
