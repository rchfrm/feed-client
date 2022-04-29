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
  conversionsPreferences: state.conversionsPreferences,
})

const ResultsStats = ({
  adData,
  aggregatedAdData,
  hasSalesObjective,
  hasInstagramGrowthObjective,
}) => {
  const { conversionsPreferences } = useControlsStore(getControlsStoreState)
  const { facebookPixelEvent } = conversionsPreferences

  const { artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { currency: { code: currency } } = min_daily_budget_info || {}

  const [newAudienceData, setNewAudienceData] = React.useState(null)
  const [existingAudienceData, setExistingAudienceData] = React.useState(null)
  const [conversionData, setConversionData] = React.useState(null)
  const [platformData, setPlatformData] = React.useState(null)

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
          'col-span-12 sm:col-span-4',
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
          'col-span-12 sm:col-span-4',
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
            'col-span-12 sm:col-span-4',
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
            'col-span-12 sm:col-span-4',
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
}

ResultsStats.defaultProps = {
}

export default ResultsStats
