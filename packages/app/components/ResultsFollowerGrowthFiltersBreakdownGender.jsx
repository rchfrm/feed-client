import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFilterOptions from '@/app/ResultsFollowerGrowthFilterOptions'
import { capitalise } from '@/helpers/utils'

const ResultsFollowerGrowthFiltersBreakdownGender = ({ gender, setGender, isDisabled }) => {
  const genders = ['all', 'female', 'male', 'unknown']
  const genderOptions = genders.map((gender) => ({ title: capitalise(gender), value: gender }))

  return (
    <div>
      <p className="mb-2">Gender</p>
      <ResultsFollowerGrowthFilterOptions
        value={gender}
        setValue={setGender}
        options={genderOptions}
        className="w-full xxs:w-auto mb-5 lg:mb-0 mr-8"
        isDisabled={isDisabled}
      />
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownGender.propTypes = {
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownGender
