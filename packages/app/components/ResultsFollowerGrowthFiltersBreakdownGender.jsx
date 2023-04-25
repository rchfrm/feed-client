import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFilterOptions from '@/app/ResultsFollowerGrowthFilterOptions'

const ResultsFollowerGrowthFiltersBreakdownGender = ({ gender, setGender }) => {
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
        className="mr-8"
      />
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownGender.propTypes = {
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownGender
