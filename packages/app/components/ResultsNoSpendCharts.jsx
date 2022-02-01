import React from 'react'
import PropTypes from 'prop-types'

import ResultsRecentPostsChart from '@/app/ResultsRecentPostsChart'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'

const ResultsNoSpendCharts = ({ metricType, className }) => {
  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {metricType === 'growth' ? (
        <ResultsFollowerGrowthChart />
      ) : (
        <ResultsRecentPostsChart
          metricType={metricType}
        />
      )}
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
  metricType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendCharts
