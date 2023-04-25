import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFiltersPeriod from '@/app/ResultsFollowerGrowthFiltersPeriod'
import ResultsFollowerGrowthFiltersBreakdown from '@/app/ResultsFollowerGrowthFiltersBreakdown'

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
  return (
    <div className="flex flex-col lg:flex-row">
      <ResultsFollowerGrowthFiltersPeriod
        period={period}
        setPeriod={setPeriod}
      />
      {hasInstagramGrowthObjective && (
        <ResultsFollowerGrowthFiltersBreakdown
          dataSourceName={dataSourceName}
          setDataSourceName={setDataSourceName}
          breakdownOptions={breakdownOptions}
          breakdownBy={breakdownBy}
          setBreakdownBy={setBreakdownBy}
          isLoading={isLoading}
        />
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
  breakdownBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasInstagramGrowthObjective: PropTypes.bool.isRequired,
}

export default ResultsFollowerGrowthFilters
