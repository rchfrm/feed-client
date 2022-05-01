import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import ResultsStats from '@/app/ResultsStats'
import ResultsTabs from '@/app/ResultsTabs'
import ResultsTopPerformingPosts from '@/app/ResultsTopPerformingPosts'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'

import MarkdownText from '@/elements/MarkdownText'

import { adMetricTypes } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ResultsContent = ({
  adData,
  aggregatedAdData,
  isSpendingPaused,
  hasNoProfiles,
}) => {
  const [metricType, setMetricType] = React.useState('engagement')

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const hasInstagramGrowthObjective = objective === 'growth' && platform === 'instagram'

  if (!adData) return <MarkdownText markdown={copy.noResultsData(isSpendingPaused)} />

  return (
    <div>
      <div className="grid grid-cols-12 sm:gap-x-12 mb-8">
        <div className={[
          'col-span-12',
        ].join(' ')}
        >
          <div className={[
            'grid grid-cols-12 sm:gap-x-12',
            'gap-y-8 sm:gap-y-16',
            'sm:mb-0',
          ].join(' ')}
          >
            <ResultsStats
              adData={adData}
              aggregatedAdData={aggregatedAdData}
              hasSalesObjective={hasSalesObjective}
              hasInstagramGrowthObjective={hasInstagramGrowthObjective}
            />
            <ResultsTabs
              metricTypes={adMetricTypes}
              metricType={metricType}
              setMetricType={setMetricType}
              shouldHideTab={!hasSalesObjective && !hasInstagramGrowthObjective}
              hasNoProfiles={hasNoProfiles}
            />
            <ResultsTopPerformingPosts
              adData={adData}
              metricType={metricType}
            />
          </div>
        </div>
      </div>
      <ResultsSpendOverview spending={adData.spend} />
    </div>
  )
}

ResultsContent.propTypes = {
  adData: PropTypes.object,
  aggregatedAdData: PropTypes.object,
  isSpendingPaused: PropTypes.bool.isRequired,
  hasNoProfiles: PropTypes.bool.isRequired,
}

ResultsContent.defaultProps = {
  adData: null,
  aggregatedAdData: null,
}

export default ResultsContent
