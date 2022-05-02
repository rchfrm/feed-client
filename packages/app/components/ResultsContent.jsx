import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import ResultsStats from '@/app/ResultsStats'
import ResultsTabs from '@/app/ResultsTabs'
import ResultsTabContent from '@/app/ResultsTabContent'
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

  const isDesktopLayout = useBreakpointTest('sm')

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
              metricType={metricType}
              hasSalesObjective={hasSalesObjective}
              hasInstagramGrowthObjective={hasInstagramGrowthObjective}
              isDesktopLayout={isDesktopLayout}
              className={isDesktopLayout ? 'order-1' : 'order-2'}
            />
            <ResultsTabs
              metricTypes={adMetricTypes}
              metricType={metricType}
              setMetricType={setMetricType}
              shouldHideTab={!hasSalesObjective && !hasInstagramGrowthObjective}
              hasNoProfiles={hasNoProfiles}
              className={isDesktopLayout ? 'order-2' : 'order-1'}
            />
            <ResultsTabContent
              adData={adData}
              metricType={metricType}
              spend={adData.spend}
              className="order-3"
            />
          </div>
        </div>
      </div>
      <ResultsSpendOverview spend={adData.spend} />
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
