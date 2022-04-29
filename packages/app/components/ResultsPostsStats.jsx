import React from 'react'
import PropTypes from 'prop-types'

import ResultsPostStats from '@/app/ResultsPostStats'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useControlsStore from '@/app/stores/controlsStore'

import { postResultsConfig } from '@/app/helpers/resultsHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
  optimizationPreferences: state.optimizationPreferences,
})

const ResultsPostsStats = ({
  adData,
  className,
}) => {
  const sortedPosts = postResultsConfig.map((x) => adData.posts.find((post) => {
    return post.type === x.type
  })).filter(Boolean)

  const { isSpendingPaused, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const isDesktopLayout = useBreakpointTest('sm')
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  return (
    sortedPosts.length ? (
      sortedPosts.map((post, index) => {
        if (post.type === 'conversions' && !hasSalesObjective) return

        return (
          <ResultsPostStats
            key={post.type}
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
        )
      })
    ) : (
      <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />
    )
  )
}

ResultsPostsStats.propTypes = {
  adData: PropTypes.object.isRequired,
}

export default ResultsPostsStats
