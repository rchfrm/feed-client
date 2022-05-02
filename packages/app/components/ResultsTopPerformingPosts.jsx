import React from 'react'
import PropTypes from 'prop-types'

import ResultsTopPerformingPost from '@/app/ResultsTopPerformingPost'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'
import ResultsEngagedAudienceChartLoader from '@/app/ResultsEngagedAudienceChartLoader'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsTopPerformingPosts = ({
  adData,
  metricType,
  className,
}) => {
  const [dailyEngageData, setDailyEngageData] = React.useState(null)

  const post = adData.posts.find(({ type }) => type === metricType)

  const { optimizationPreferences, isSpendingPaused } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const chartType = objective === 'growth' && (platform === 'instagram' || platform === 'facebook') ? 'bar' : 'line'

  if (!post) return <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />

  return (
    <>
      {metricType === 'engagement' && (
        <ResultsEngagedAudienceChartLoader
          dailyData={dailyEngageData}
          setDailyData={setDailyEngageData}
          chartType={chartType}
          platform={platform}
        />
      )}
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
    </>
  )
}

ResultsTopPerformingPosts.propTypes = {
  adData: PropTypes.object.isRequired,
  metricType: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ResultsTopPerformingPosts.defaultProps = {
  className: '',
}

export default ResultsTopPerformingPosts
