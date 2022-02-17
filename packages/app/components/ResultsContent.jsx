import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import ResultsStats from '@/app/ResultsStats'
import ResultsPostsStats from '@/app/ResultsPostsStats'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'
import ResultsConversionsTeaser from '@/app/ResultsConversionsTeaser'
import ResultsConversionsActivator from '@/app/ResultsConversionsActivator'

import MarkdownText from '@/elements/MarkdownText'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/ResultsPageCopy'

const getConversionsPreferences = state => state.conversionsPreferences

const ResultsContent = ({ data, isSpendingPaused }) => {
  const { featureFlags: { conversionsEnabled: hasConversionsFeatureEnabled } } = React.useContext(ArtistContext)

  const conversionsPreferences = useControlsStore(getConversionsPreferences)
  const hasSetUpConversions = Object.values(conversionsPreferences).every(Boolean)
  const hasConversionColumn = hasConversionsFeatureEnabled && hasSetUpConversions

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
            hasConversionsFeatureEnabled && !hasSetUpConversions ? 'mb-8' : null,
            'sm:mb-0',
          ].join(' ')}
          >
            <ResultsStats
              data={data}
              hasConversionColumn={hasConversionColumn}
              className={hasConversionColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
            <ResultsPostsStats
              data={data}
              className={hasConversionColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
          </div>
        </div>
        {!hasConversionsFeatureEnabled && (
          <ResultsConversionsTeaser
            className="hidden col-span-12 sm:col-span-4 sm:flex flex-col sm:items-center"
          />
        )}
        {hasConversionsFeatureEnabled && !hasSetUpConversions && (
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
