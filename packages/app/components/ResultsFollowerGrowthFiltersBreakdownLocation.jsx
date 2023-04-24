import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'

const ResultsFollowerGrowthFiltersBreakdownLocation = ({
  name,
  breakdownBy,
  setBreakdownBy,
  breakdownOptions,
  handleChange,
  isLoading,
}) => {
  React.useEffect(() => {
    setBreakdownBy(breakdownOptions[0].value)
  }, [setBreakdownBy, breakdownOptions])

  return (
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
  )
}

ResultsFollowerGrowthFiltersBreakdownLocation.propTypes = {
  name: PropTypes.string.isRequired,
  breakdownBy: PropTypes.string.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownLocation
