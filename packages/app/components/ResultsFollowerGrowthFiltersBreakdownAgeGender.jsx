import React from 'react'
import PropTypes from 'prop-types'

const ResultsFollowerGrowthFiltersBreakdownAgeGender = ({
  breakdownBy,
  breakdownOptions,
}) => {
  return (
    <div className="">
      <div>Age and Gender</div>
      <div>{breakdownBy}</div>
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGender.propTypes = {
  breakdownBy: PropTypes.string.isRequired,
  breakdownOptions: PropTypes.array.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGender
