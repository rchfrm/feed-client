import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsNewAudienceStats from '@/app/ResultsNewAudienceStats'
import ResultsExistingAudienceStats from '@/app/ResultsExistingAudienceStats'
import ResultsConversionStats from '@/app/ResultsConversionStats'
import ResultsPlatformGrowthStats from '@/app/ResultsPlatformGrowthStats'
import ResultsConversionsActivator from '@/app/ResultsConversionsActivator'

import MarkdownText from '@/elements/MarkdownText'

import { getStatsData } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  conversionsPreferences: state.conversionsPreferences,
})

const ResultsStats = ({
  adData,
  aggregatedAdData,
  className,
}) => {
  const { optimizationPreferences, conversionsPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const { facebookPixelEvent } = conversionsPreferences

  const { artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { currency: { code: currency } } = min_daily_budget_info || {}

  const [newAudienceData, setNewAudienceData] = React.useState(null)
  const [existingAudienceData, setExistingAudienceData] = React.useState(null)
  const [conversionData, setConversionData] = React.useState(null)
  const [platformData, setPlatformData] = React.useState(null)

  const hasSalesObjective = objective === 'sales'
  const hasInstagramGrowthObjective = objective === 'growth' && platform === 'instagram'

  React.useEffect(() => {
    const {
      newAudienceData,
      existingAudienceData,
      conversionData,
      platformData,
    } = getStatsData({ ...adData, facebookPixelEvent, currency }, aggregatedAdData)

    setNewAudienceData(newAudienceData)
    setExistingAudienceData(existingAudienceData)
    setConversionData(conversionData)
    setPlatformData(platformData)
  }, [adData, aggregatedAdData, facebookPixelEvent, currency])

  return (
    <>
      <div
        className={[
          'col-span-12',
          'order-1',
          className,
        ].join(' ')}
      >
        {newAudienceData ? (
          <ResultsNewAudienceStats data={newAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div
        className={[
          'col-span-12',
          'order-2',
          className,
        ].join(' ')}
      >
        {existingAudienceData ? (
          <ResultsExistingAudienceStats data={existingAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-green" />
        )}
      </div>
      {hasSalesObjective && (
        <div
          className={[
            'col-span-12',
            'order-3',
            className,
          ].join(' ')}
        >
          {conversionData ? (
            <ResultsConversionStats data={conversionData} currency={currency} />
          ) : (
            <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-insta" />
          )}
        </div>
      )}
      {hasInstagramGrowthObjective && (
        <div
          className={[
            'col-span-12',
            'order-3',
            className,
          ].join(' ')}
        >
          {platformData ? (
            <ResultsPlatformGrowthStats data={platformData} />
          ) : (
            <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-insta" />
          )}
        </div>
      )}
      {!hasInstagramGrowthObjective && !hasSalesObjective && (
        <ResultsConversionsActivator
          className="col-span-12 sm:col-span-4 flex flex-col sm:items-center"
        />
      )}
    </>
  )
}

ResultsStats.propTypes = {
  adData: PropTypes.object.isRequired,
  aggregatedAdData: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsStats.defaultProps = {
  className: '',
}

export default ResultsStats
