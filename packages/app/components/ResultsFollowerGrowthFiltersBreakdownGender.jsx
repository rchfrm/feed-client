import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFilterOptions from '@/app/ResultsFollowerGrowthFilterOptions'

const ResultsFollowerGrowthFiltersBreakdownGender = ({ gender, setGender, isDisabled }) => {
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
