import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'

const ResultsFollowerGrowthFiltersBreakdownLocation = ({
  title,
  name,
  breakdownBy,
  setBreakdownBy,
  breakdownOptions,
  isLoading,
}) => {
  const handleChange = (e) => {
    const { target: { value } } = e

    setBreakdownBy({
      name,
      value,
    })
  }

  React.useEffect(() => {
    setBreakdownBy({
      name,
      value: breakdownOptions[0].value,
    })
  }, [name, setBreakdownBy, breakdownOptions])

  return (
    <div>
      <p className="mb-2">{title}</p>
      <Select
        name="breakdown"
        version="small box"
        handleChange={handleChange}
        options={breakdownOptions}
        selectedValue={breakdownBy?.value || breakdownOptions[0].value}
        loading={isLoading}
        className="w-full xxs:w-40"
      />
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownLocation.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  breakdownBy: PropTypes.object,
  setBreakdownBy: PropTypes.func.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

ResultsFollowerGrowthFiltersBreakdownLocation.defaultProps = {
  breakdownBy: null,
  isLoading: false,
}

export default ResultsFollowerGrowthFiltersBreakdownLocation
