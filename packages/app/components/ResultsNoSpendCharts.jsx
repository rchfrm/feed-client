import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartContent from '@/app/ResultsPostsChartContent'
import ResultsGrowthChartContent from '@/app/ResultsGrowthChartContent'

const ResultsNoSpendCharts = ({
  data,
  resultsType,
  metricType,
  hasGrowth,
  className,
}) => {
  const [posts, setPosts] = React.useState([])
  const [aggregatedOrganicBenchmarkData, setAggregatedOrganicBenchmarkData] = React.useState(null)
  const [dailyGrowthData, setDailyGrowthData] = React.useState(null)

  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {resultsType === 'organic' && metricType !== 'growth' && (
        <ResultsPostsChartContent
          posts={posts}
          setPosts={setPosts}
          aggregatedOrganicBenckmarkData={aggregatedOrganicBenchmarkData}
          setAggregatedOrganicBenchmarkData={setAggregatedOrganicBenchmarkData}
          organicBenchmarkData={data}
          metricType={metricType}
        />
      )}
      {metricType === 'growth' && hasGrowth && (
        <ResultsGrowthChartContent
          dailyData={dailyGrowthData}
          setDailyData={setDailyGrowthData}
        />
      )}
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
  data: PropTypes.object.isRequired,
  resultsType: PropTypes.string.isRequired,
  metricType: PropTypes.string.isRequired,
  hasGrowth: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendCharts
