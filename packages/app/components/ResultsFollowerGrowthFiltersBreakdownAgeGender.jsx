import React from 'react'
import ResultsFollowerGrowthFilterOptions from '@/app/ResultsFollowerGrowthFilterOptions'
import Select from '@/elements/Select'

const ResultsFollowerGrowthFiltersBreakdownAgeGender = () => {
  const [gender, setGender] = React.useState('all')
  const [age, setAge] = React.useState({ min: '13', max: '64' })

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

  const minAgeValues = ['13', '18', '25', '35', '45', '55', '65+']
  const maxAgeValues = ['17', '24', '34', '44', '54', '64', 'None']

  const handleChange = (e) => {
    const { target: { name, value } } = e

    setAge({
      ...age,
      [name]: value,
    })
  }

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
            options={minAgeValues.map((age) => ({ name: age, value: age }))}
            selectedValue={age.min}
            className="w-16 mr-1"
          />
          <Select
            name="max"
            version="small box"
            handleChange={handleChange}
            options={maxAgeValues.map((age) => ({ name: age, value: age }))}
            selectedValue={age.max}
            className="w-16"
          />
        </div>
      </div>
    </div>
  )
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGender
