import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartContent from '@/app/ResultsPostsChartContent'
import ResultsGrowthChartContent from '@/app/ResultsGrowthChartContent'

const ResultsNoSpendCharts = ({
  data,
  dummyPostsImages,
  hasNoProfiles,
  metricType,
  hasGrowth,
  className,
}) => {
  const [posts, setPosts] = React.useState([])
  const [aggregatedOrganicBenchmarkData, setAggregatedOrganicBenchmarkData] = React.useState(hasNoProfiles ? data : null)
  const [dailyGrowthData, setDailyGrowthData] = React.useState(null)

  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {metricType !== 'growth' && (
        <ResultsPostsChartContent
          hasNoProfiles={hasNoProfiles}
          dummyPostsImages={dummyPostsImages}
          posts={posts}
          setPosts={setPosts}
          aggregatedOrganicBenckmarkData={aggregatedOrganicBenchmarkData}
          setAggregatedOrganicBenchmarkData={setAggregatedOrganicBenchmarkData}
          organicBenchmarkData={hasNoProfiles ? null : data}
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
  hasNoProfiles: PropTypes.bool.isRequired,
  metricType: PropTypes.string.isRequired,
  hasGrowth: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default ResultsNoSpendCharts
