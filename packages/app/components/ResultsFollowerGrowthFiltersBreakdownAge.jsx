import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'

const ResultsFollowerGrowthFiltersBreakdownAge = ({
  age,
  setAge,
  minAgeValues,
  maxAgeValues,
  isDisabled,
}) => {
  const minAgeOptions = minAgeValues.filter((x) => x < age?.max).map((y) => ({ name: y === 65 ? '65+' : y, value: y }))
  const maxAgeOptions = maxAgeValues.filter((x) => x > age?.min).map((y) => ({ name: y === 99 ? 'None' : y, value: y }))

  const handleChange = (e) => {
    const { target: { name, value } } = e

    setAge({
      ...age,
      [name]: value,
    })
  }

  return (
    <div>
      <p className="mb-2 text-xs">Age</p>
      <div className="flex">
        <Select
          name="min"
          version="small box"
          handleChange={handleChange}
          options={minAgeOptions}
          selectedValue={age?.min}
          className="w-1/2 xxs:w-16 mr-1 mb-5 text-xs"
          disabled={isDisabled}
        />
        <Select
          name="max"
          version="small box"
          handleChange={handleChange}
          options={maxAgeOptions}
          selectedValue={age?.max}
          className="w-1/2 xxs:w-16 mb-5 text-xs"
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAge.propTypes = {
  age: PropTypes.object.isRequired,
  setAge: PropTypes.func.isRequired,
  minAgeValues: PropTypes.array.isRequired,
  maxAgeValues: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAge
