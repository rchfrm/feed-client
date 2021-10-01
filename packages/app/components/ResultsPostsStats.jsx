import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostStats from '@/app/ResultsPostStats'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'

import { postResultsConfig } from '@/app/helpers/resultsHelpers'

const ResultsPostsStats = ({
  data,
  hasSpendFor30Days,
  isLast30Days,
  className,
}) => {
  const sortedPosts = postResultsConfig.map((x) => data.posts.find((element) => {
    const key = Array.isArray(x.key) ? x.key[0] : x.key
    return element[key]
  })).filter(Boolean)
  const isSpendingPaused = hasSpendFor30Days || !isLast30Days

  return (
    sortedPosts.length ? (
      sortedPosts.map((post, index) => (
        <ResultsPostStats
          key={post.id}
          post={post}
          config={postResultsConfig[index]}
          className={[
            'col-span-12',
            className,
            'flex flex-col sm:items-center',
            `order-${index + 1} sm:order-${index + 4}`,
            'mb-6 sm:mb-0',
          ].join(' ')}
        />
      ))
    ) : (
      <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />
    )
  )
}

ResultsPostsStats.propTypes = {
  data: PropTypes.object.isRequired,
  hasSpendFor30Days: PropTypes.bool.isRequired,
  isLast30Days: PropTypes.bool.isRequired,
}

export default ResultsPostsStats
