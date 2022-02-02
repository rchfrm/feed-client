import React from 'react'
import PropTypes from 'prop-types'

import ResultsRecentPostsChart from '@/app/ResultsRecentPostsChart'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'

const ResultsNoSpendCharts = ({ data, metricType, className }) => {
  const yourAverage = data[metricType].value

  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {metricType === 'growth' ? (
        <ResultsFollowerGrowthChart />
      ) : (
        <ResultsRecentPostsChart
          metricType={metricType}
          yourAverage={yourAverage}
        />
      )}
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
  data: PropTypes.object.isRequired,
  metricType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendCharts
