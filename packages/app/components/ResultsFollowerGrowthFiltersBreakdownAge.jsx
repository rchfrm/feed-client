import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'

const ResultsFollowerGrowthFiltersBreakdownAge = ({ age, setAge }) => {
  const minAgeValues = [13, 18, 25, 35, 45, 55, 65]
  const maxAgeValues = [17, 24, 34, 44, 54, 64, 99]

  const minAgeOptions = minAgeValues.filter((x) => x < age.max).map((y) => ({ name: y === 65 ? '65+' : y, value: y }))
  const maxAgeOptions = maxAgeValues.filter((x) => x > age.min).map((y) => ({ name: y === 99 ? 'None' : y, value: y }))

  const handleChange = (e) => {
    const { target: { name, value } } = e

    setAge({
      ...age,
      [name]: value,
    })
  }

  return (
    <div>
      <p className="mb-2">Age</p>
      <div className="flex">
        <Select
          name="min"
          version="small box"
          handleChange={handleChange}
          options={minAgeOptions}
          selectedValue={age.min}
          className="w-16 mr-1"
        />
        <Select
          name="max"
          version="small box"
          handleChange={handleChange}
          options={maxAgeOptions}
          selectedValue={age.max}
          className="w-16"
        />
      </div>
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAge.propTypes = {
  age: PropTypes.string.isRequired,
  setAge: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAge
