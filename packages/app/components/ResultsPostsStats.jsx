import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostStats from '@/app/ResultsPostStats'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useControlsStore from '@/app/stores/controlsStore'

import { postResultsConfig } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ResultsPostsStats = ({
  data,
  className,
}) => {
  const sortedPosts = postResultsConfig.map((x) => data.posts.find((element) => {
    const key = Array.isArray(x.key) ? x.key[0] : x.key
    return element[key]
  })).filter(Boolean)

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)
  const isDesktopLayout = useBreakpointTest('sm')

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
            isDesktopLayout ? 'order-4' : `order-${index + 1}`,
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
}

export default ResultsPostsStats
