import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { findClosestNumber } from '@/helpers/utils'


const ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets = ({
  preset,
  setPreset,
  setBreakdownBy,
  minAgeValues,
  maxAgeValues,
}) => {
  const { targetingState } = React.useContext(TargetingContext)
  const { age_min: ageMin, age_max: ageMax, genders } = targetingState

  const presetOptions = [
    {
      name: 'Targeted',
      value: 'targeted',
    },
    {
      name: 'Non-targeted',
      value: 'non-targeted',
    },
    {
      name: 'None',
      value: 'none',
    },
  ]

  const getAgeAndGender = (ageMin, ageMax, genders, preset) => {
    const gender = genders.length === 0 ? 'all' : genders[0]

    return {
      gender,
      min: ! minAgeValues.includes(ageMin) ? findClosestNumber(ageMin, minAgeValues) : ageMin,
      max: ! maxAgeValues.includes(ageMax) ? findClosestNumber(ageMax, maxAgeValues, true) : ageMax,
      preset,
    }
  }

  const handleChange = (e) => {
    const { target: { value } } = e
    setPreset(value)
  }

  React.useEffect(() => {
    if (preset !== 'none') {
      setBreakdownBy(getAgeAndGender(ageMin, ageMax, genders, preset))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, ageMin, ageMax, genders, setBreakdownBy])

  return (
    <div>
      <p className="mb-2">Presets</p>
      <div className="flex">
        <Select
          name="min"
          version="small box"
          handleChange={handleChange}
          options={presetOptions}
          selectedValue={preset}
          className="w-1/2 xxs:w-32 mr-1 mb-5 mr-8"
        />
      </div>
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets.propTypes = {
  preset: PropTypes.string.isRequired,
  setPreset: PropTypes.func.isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  minAgeValues: PropTypes.array.isRequired,
  maxAgeValues: PropTypes.array.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets
