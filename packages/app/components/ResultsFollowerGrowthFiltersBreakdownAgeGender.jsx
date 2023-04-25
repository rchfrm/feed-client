import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets from '@/app/ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets'
import ResultsFollowerGrowthFiltersBreakdownGender from '@/app/ResultsFollowerGrowthFiltersBreakdownGender'
import ResultsFollowerGrowthFiltersBreakdownAge from '@/app/ResultsFollowerGrowthFiltersBreakdownAge'

const ResultsFollowerGrowthFiltersBreakdownAgeGender = ({ setBreakdownBy }) => {
  const [preset, setPreset] = React.useState('targeted')
  const [gender, setGender] = React.useState('all')
  const [age, setAge] = React.useState({ min: 13, max: 99 })

  const hasNoPresets = preset === 'none'
  const minAgeValues = [13, 18, 25, 35, 45, 55, 65]
  const maxAgeValues = [17, 24, 34, 44, 54, 64, 99]

  React.useEffect(() => {
    if (hasNoPresets) {
      setBreakdownBy({
        gender,
        min: age.min,
        max: age.max,
        preset,
      })
    }
  }, [gender, age, setBreakdownBy, preset, hasNoPresets])

  return (
    <div className="flex flex-col xxs:flex-row">
      <ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets
        preset={preset}
        setPreset={setPreset}
        setBreakdownBy={setBreakdownBy}
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
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGender.propTypes = {
  setBreakdownBy: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGender
