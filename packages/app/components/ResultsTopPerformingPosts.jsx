import React from 'react'
import PropTypes from 'prop-types'

import ResultsTopPerformingPost from '@/app/ResultsTopPerformingPost'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsTopPerformingPosts = ({
  adData,
  metricType,
  className,
}) => {
  const post = adData.posts.find(({ type }) => type === metricType)
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  if (!post) return <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />

  return (
    <ResultsTopPerformingPost
      key={post.id}
      post={post}
      metricType={metricType}
      className={[
        'col-span-12 sm:col-span-6',
        'flex flex-col',
        className,
        'order-4',
        'mb-6 sm:mb-0',
      ].join(' ')}
    />
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
