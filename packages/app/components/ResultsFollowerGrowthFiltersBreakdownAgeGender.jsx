import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFilterOptions from '@/app/ResultsFollowerGrowthFilterOptions'
import Select from '@/elements/Select'

const ResultsFollowerGrowthFiltersBreakdownAgeGender = ({ setBreakdownBy }) => {
  const [gender, setGender] = React.useState('all')
  const [age, setAge] = React.useState({ min: 13, max: 99 })

  const genderOptions = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Female',
      value: 'female',
    },
    {
      title: 'Male',
      value: 'male',
    },
    {
      title: 'Unknown',
      value: 'unknown',
    },
  ]

  const handleChange = (e) => {
    const { target: { name, value } } = e

    setAge({
      ...age,
      [name]: value,
    })
  }

  React.useEffect(() => {
    setBreakdownBy({
      gender,
      min: age.min,
      max: age.max,
    })
  }, [gender, age, setBreakdownBy])

  const minAgeValues = [13, 18, 25, 35, 45, 55, 65]
  const maxAgeValues = [17, 24, 34, 44, 54, 64, 99]
  const minAgeOptions = minAgeValues.filter((x) => x < age.max).map((y) => ({ name: y === 65 ? '65+' : y, value: y }))
  const maxAgeOptions = maxAgeValues.filter((x) => x > age.min).map((y) => ({ name: y === 99 ? 'None' : y, value: y }))

  return (
    <div className="flex">
      <div>
        <p className="mb-2">Gender</p>
        <ResultsFollowerGrowthFilterOptions
          value={gender}
          setValue={setGender}
          options={genderOptions}
          className="mr-8"
        />
      </div>
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
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGender.propTypes = {
  setBreakdownBy: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGender
