import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostStats from '@/app/ResultsPostStats'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsPostsStats = ({
  adData,
  metricType,
  className,
}) => {
  const post = adData.posts.find(({ type }) => type === metricType)
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  if (!post) return <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />

  return (
    <ResultsPostStats
      key={post.id}
      post={post}
      className={[
        'col-span-12 sm:col-span-4',
        'flex flex-col sm:items-center',
        className,
        'order-4',
        'mb-6 sm:mb-0',
      ].join(' ')}
    />
  )
}

ResultsPostsStats.propTypes = {
  adData: PropTypes.object.isRequired,
  metricType: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ResultsPostsStats.defaultProps = {
  className: '',
}

export default ResultsPostsStats
