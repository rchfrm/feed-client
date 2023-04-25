import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFiltersBreakdownGender from '@/app/ResultsFollowerGrowthFiltersBreakdownGender'
import ResultsFollowerGrowthFiltersBreakdownAge from '@/app/ResultsFollowerGrowthFiltersBreakdownAge'

const ResultsFollowerGrowthFiltersBreakdownAgeGender = ({ setBreakdownBy }) => {
  const [gender, setGender] = React.useState('all')
  const [age, setAge] = React.useState({ min: 13, max: 99 })

  React.useEffect(() => {
    setBreakdownBy({
      gender,
      min: age.min,
      max: age.max,
    })
  }, [gender, age, setBreakdownBy])

  return (
    <div className="flex flex-col xxs:flex-row">
      <ResultsFollowerGrowthFiltersBreakdownGender
        gender={gender}
        setGender={setGender}
      />
      <ResultsFollowerGrowthFiltersBreakdownAge
        age={age}
        setAge={setAge}
      />
    </div>
  )
}

ResultsFollowerGrowthFiltersBreakdownAgeGender.propTypes = {
  setBreakdownBy: PropTypes.func.isRequired,
}

export default ResultsFollowerGrowthFiltersBreakdownAgeGender
