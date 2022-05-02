import React from 'react'
import PropTypes from 'prop-types'

import ResultsTopPerformingPost from '@/app/ResultsTopPerformingPost'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'
import ResultsEngagedAudienceChartLoader from '@/app/ResultsEngagedAudienceChartLoader'
import ResultsAdGrowthChartLoader from '@/app/ResultsAdGrowthChartLoader'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsTabContent = ({
  adData,
  metricType,
  className,
}) => {
  const [dailyEngageData, setDailyEngageData] = React.useState(null)
  const [dailyGrowthData, setDailyGrowthData] = React.useState(null)

  const post = adData.posts.find(({ type }) => type === metricType)

  const { optimizationPreferences, isSpendingPaused } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const hasGrowthObjective = objective === 'growth'

  return (
    <>
      {metricType === 'engagement' && (
        <ResultsEngagedAudienceChartLoader
          dailyData={dailyEngageData}
          setDailyData={setDailyEngageData}
          hasGrowthObjective={hasGrowthObjective}
          platform={platform}
        />
      )}
      {hasGrowthObjective && metricType === 'growth' && (
        <ResultsAdGrowthChartLoader
          dailyData={dailyGrowthData}
          setDailyData={setDailyGrowthData}
          platform={platform}
        />
      )}
      {post ? (
        <ResultsTopPerformingPost
          key={post.id}
          post={post}
          metricType={metricType}
          className={[
            'col-span-12 sm:col-span-6',
            'flex flex-col',
            className,
          ].join(' ')}
        />
      ) : (
        <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />
      )}
    </>
  )
}

ResultsTabContent.propTypes = {
  adData: PropTypes.object.isRequired,
  metricType: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ResultsTabContent.defaultProps = {
  className: '',
}

export default ResultsTabContent
