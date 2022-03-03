import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartContent from '@/app/ResultsPostsChartContent'
import ResultsGrowthChartContent from '@/app/ResultsGrowthChartContent'

const ResultsNoSpendCharts = ({
  data,
  dummyPostsImages,
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
      {metricType !== 'growth' && (
        <ResultsPostsChartContent
          resultsType={resultsType}
          dummyPostsImages={dummyPostsImages}
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
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default ResultsNoSpendCharts
