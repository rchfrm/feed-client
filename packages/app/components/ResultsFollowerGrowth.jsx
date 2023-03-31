import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthFilters from '@/app/ResultsFollowerGrowthFilters'
import ResultsFollowerGrowthSummary from '@/app/ResultsFollowerGrowthSummary'
import ResultsFollowGrowthChartLoader from '@/app/ResultsFollowerGrowthChartLoader'

const ResultsFollowerGrowth = ({ platform }) => {
  const [period, setPeriod] = React.useState('all')

  return (
    <div className="mb-10">
      <ResultsFollowerGrowthFilters
        period={period}
        setPeriod={setPeriod}
      />
      <ResultsFollowerGrowthSummary description="3.2k extra followers added, at an estimated £0.21 each." />
      <ResultsFollowGrowthChartLoader
        platform={platform}
        period={period}
      />
    </div>
  )
}

ResultsFollowerGrowth.propTypes = {
  platform: PropTypes.string.isRequired,
}

export default ResultsFollowerGrowth
