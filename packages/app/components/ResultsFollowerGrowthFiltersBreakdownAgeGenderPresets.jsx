import React from 'react'
import PropTypes from 'prop-types'
import Select from '@/elements/Select'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { findClosestNumber } from '@/helpers/utils'

const ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets = ({
  name,
  preset,
  setPreset,
  setBreakdownBy,
  setGender,
  setAge,
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
    const genderDictionary = {
      men: 'male',
      women: 'female',
    }
    const gender = genders.length === 0 ? 'all' : genderDictionary[genders[0]]

    return {
      name,
      value: {
        gender,
        min: ! minAgeValues.includes(ageMin) ? findClosestNumber(ageMin, minAgeValues) : ageMin,
        max: ! maxAgeValues.includes(ageMax) ? findClosestNumber(ageMax, maxAgeValues, true) : ageMax,
        preset,
      },
    }
  }

  const handleChange = (e) => {
    const { target: { value } } = e
    setPreset(value)
  }

  React.useEffect(() => {
    const breakdown = getAgeAndGender(ageMin, ageMax, genders, preset)

    if (preset === 'targeted' || preset === 'non-targeted') {
      setBreakdownBy(breakdown)
    }

    if (preset === 'targeted') {
      setGender(breakdown.value.gender)
      setAge({
        min: breakdown.value.min,
        max: breakdown.value.max,
      })
      return
    }

    if (preset === 'none') {
      setGender('all')
      setAge({
        min: minAgeValues[0],
        max: maxAgeValues[maxAgeValues.length - 1],
      })
      return
    }

    if (preset === 'non-targeted') {
      setGender('')
      setAge(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, ageMin, ageMax, genders, setBreakdownBy])

  return (
    <div>
      <p className="mb-2 text-xs">Preset</p>
      <div className="flex">
        <Select
          name="min"
          version="small box"
          handleChange={handleChange}
          options={presetOptions}
          selectedValue={preset}
          className="w-full xxs:w-32 mb-5 text-xs"
        />
      </div>
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets.propTypes = {
  name: PropTypes.string.isRequired,
  preset: PropTypes.string.isRequired,
  setPreset: PropTypes.func.isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  setGender: PropTypes.func.isRequired,
  setAge: PropTypes.func.isRequired,
  minAgeValues: PropTypes.array.isRequired,
  maxAgeValues: PropTypes.array.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGenderPresets
