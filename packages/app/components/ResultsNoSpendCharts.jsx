import React from 'react'
import PropTypes from 'prop-types'

import ResultsRecentPostsChart from '@/app/ResultsRecentPostsChart'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'

const ResultsNoSpendCharts = ({ audienceType, className }) => {
  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {audienceType === 'growth' ? (
        <ResultsFollowerGrowthChart />
      ) : (
        <ResultsRecentPostsChart
          audienceType={audienceType}
        />
      )}
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
  audienceType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendCharts
