import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import ResultsStats from '@/app/ResultsStats'
import ResultsPostsStats from '@/app/ResultsPostsStats'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'
import ResultsConversionsActivator from '@/app/ResultsConversionsActivator'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  conversionsPreferences: state.conversionsPreferences,
})

const ResultsContent = ({ adData, aggregatedAdData, isSpendingPaused }) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const hasSalesObjective = objective === 'sales'
  const hasInstagramGrowthObjective = objective === 'growth' && platform === 'instagram'
  const hasThirdColumn = hasSalesObjective || hasInstagramGrowthObjective

  if (!adData) return <MarkdownText markdown={copy.noResultsData(isSpendingPaused)} />

  return (
    <div>
      <div className="grid grid-cols-12 sm:gap-x-12 mb-8">
        <div className={[
          'col-span-12',
          hasThirdColumn ? null : 'sm:col-span-8',
        ].join(' ')}
        >
          <div className={[
            'grid grid-cols-12 sm:gap-x-12',
            'gap-y-8 sm:gap-y-16',
            hasThirdColumn ? 'mb-8' : null,
            'sm:mb-0',
          ].join(' ')}
          >
            <ResultsStats
              adData={adData}
              aggregatedAdData={aggregatedAdData}
              hasSalesObjective={hasSalesObjective}
              hasInstagramGrowthObjective={hasInstagramGrowthObjective}
              className={hasThirdColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
            <ResultsPostsStats
              adData={adData}
              className={hasThirdColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
          </div>
        </div>
        {!hasThirdColumn && (
          <ResultsConversionsActivator
            className="col-span-12 sm:col-span-4 flex flex-col sm:items-center"
          />
        )}
      </div>
      <ResultsSpendOverview spending={adData.spend} />
    </div>
  )
}

ResultsContent.propTypes = {
  adData: PropTypes.object,
  aggregatedAdData: PropTypes.object,
  isSpendingPaused: PropTypes.bool.isRequired,
}

ResultsContent.defaultProps = {
  adData: null,
  aggregatedAdData: null,
}

export default ResultsContent
