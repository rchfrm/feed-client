import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostsChartContent from '@/app/ResultsPostsChartContent'
import ResultsGrowthChartContent from '@/app/ResultsGrowthChartContent'

const ResultsNoSpendCharts = ({
  organicData,
  aggregatedOrganicData,
  hasNoProfiles,
  dummyPostsImages,
  metricType,
  hasGrowth,
  className,
}) => {
  const [posts, setPosts] = React.useState([])
  const [dailyGrowthData, setDailyGrowthData] = React.useState(null)

  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {metricType !== 'growth' && (
        <ResultsPostsChartContent
          organicData={organicData}
          aggregatedOrganicData={aggregatedOrganicData}
          hasNoProfiles={hasNoProfiles}
          dummyPostsImages={dummyPostsImages}
          posts={posts}
          setPosts={setPosts}
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
  organicData: PropTypes.object.isRequired,
  aggregatedOrganicData: PropTypes.object.isRequired,
  hasNoProfiles: PropTypes.bool.isRequired,
  metricType: PropTypes.string.isRequired,
  hasGrowth: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default ResultsNoSpendCharts
