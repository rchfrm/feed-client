import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets from '@/app/ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets'
import ResultsFollowerGrowthFiltersBreakdownGender from '@/app/ResultsFollowerGrowthFiltersBreakdownGender'
import ResultsFollowerGrowthFiltersBreakdownAge from '@/app/ResultsFollowerGrowthFiltersBreakdownAge'

const ResultsFollowerGrowthFiltersBreakdownAgeGender = ({ name, setBreakdownBy }) => {
  const [preset, setPreset] = React.useState('targeted')
  const [gender, setGender] = React.useState('all')
  const [age, setAge] = React.useState({ min: 13, max: 99 })

  const hasNoPresets = preset === 'none'
  const minAgeValues = [13, 18, 25, 35, 45, 55, 65]
  const maxAgeValues = [17, 24, 34, 44, 54, 64, 99]

  React.useEffect(() => {
    if (hasNoPresets) {
      setBreakdownBy({
        name,
        value: {
          gender,
          min: age?.min,
          max: age?.max,
          preset,
        },
      })
    }
  }, [name, gender, age, setBreakdownBy, preset, hasNoPresets])

  return (
    <>
      <ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets
        name={name}
        preset={preset}
        setPreset={setPreset}
        setBreakdownBy={setBreakdownBy}
        setGender={setGender}
        setAge={setAge}
        minAgeValues={minAgeValues}
        maxAgeValues={maxAgeValues}
      />
      <ResultsFollowerGrowthFiltersBreakdownGender
        gender={gender}
        setGender={setGender}
        isDisabled={! hasNoPresets}
      />
      <ResultsFollowerGrowthFiltersBreakdownAge
        age={age}
        setAge={setAge}
        minAgeValues={minAgeValues}
        maxAgeValues={maxAgeValues}
        isDisabled={! hasNoPresets}
      />
    </>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGender.propTypes = {
  name: PropTypes.string.isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGender
