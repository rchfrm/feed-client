import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import { isObject } from '@/helpers/utils'

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
        selectedValue={isObject(breakdownBy) ? breakdownOptions[0].value : breakdownBy}
        loading={isLoading}
        className="w-full xxs:w-40"
      />
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownLocation.propTypes = {
  name: PropTypes.string.isRequired,
  breakdownBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

ResultsFollowerGrowthFiltersBreakdownLocation.defaultProps = {
  isLoading: false,
}

export default ResultsFollowerGrowthFiltersBreakdownLocation
