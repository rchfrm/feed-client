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

const ResultsContent = ({ data, isSpendingPaused }) => {
  const { optimizationPreferences, conversionsPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const hasSetUpConversions = Object.values(conversionsPreferences).every(Boolean)
  const hasConversionColumn = hasSalesObjective && hasSetUpConversions

  if (!data) return <MarkdownText markdown={copy.noResultsData(isSpendingPaused)} />

  return (
    <div>
      <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
        <div className={[
          'col-span-12',
          hasConversionColumn ? null : 'sm:col-span-8',
        ].join(' ')}
        >
          <div className={[
            'grid grid-cols-12 sm:col-gap-12',
            'row-gap-8 sm:row-gap-16',
            hasSalesObjective && !hasSetUpConversions ? 'mb-8' : null,
            'sm:mb-0',
          ].join(' ')}
          >
            <ResultsStats
              data={data}
              hasConversionColumn={hasConversionColumn}
              className={hasSalesObjective ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
            <ResultsPostsStats
              data={data}
              className={hasConversionColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
          </div>
        </div>
        {hasSalesObjective && !hasSetUpConversions && (
          <ResultsConversionsActivator
            className="col-span-12 sm:col-span-4 flex flex-col sm:items-center"
          />
        )}
      </div>
      <ResultsSpendOverview spending={data.spend} />
    </div>
  )
}

ResultsContent.propTypes = {
  data: PropTypes.object,
  isSpendingPaused: PropTypes.bool.isRequired,
}

ResultsContent.defaultProps = {
  data: null,
}

export default ResultsContent
