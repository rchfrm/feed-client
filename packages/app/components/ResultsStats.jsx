import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsNewAudienceStats from '@/app/ResultsNewAudienceStats'
import ResultsExistingAudienceStats from '@/app/ResultsExistingAudienceStats'
import ResultsConversionStats from '@/app/ResultsConversionStats'
import ResultsPlatformGrowthStats from '@/app/ResultsPlatformGrowthStats'
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
  hasSpotifyGrowthObjective,
  platform,
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
    } = getStatsData({ ...adData, facebookPixelEvent, currency }, aggregatedAdData, platform)

    setNewAudienceData(newAudienceData)
    setExistingAudienceData(existingAudienceData)
    setConversionData(conversionData)
    setPlatformData(platformData)
  }, [adData, aggregatedAdData, facebookPixelEvent, currency, platform])

  return (
    <div className="grid grid-cols-12 border border-solid border-grey-light rounded-dialogue overflow-hidden">
      <div className="col-span-12 sm:col-span-4 mb-8 sm:mb-0 border-r border-solid border-grey-light">
        {newAudienceData ? (
          <ResultsNewAudienceStats data={newAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-twitter" />
        )}
      </div>

      <div className="col-span-12 sm:col-span-4 mb-8 sm:mb-0 border-r border-solid border-grey-light">
        {existingAudienceData ? (
          <ResultsExistingAudienceStats data={existingAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-green" />
        )}
      </div>

      {hasSalesObjective && (
        <div className="col-span-12 sm:col-span-4 mb-8 sm:mb-0">
          {conversionData ? (
            <ResultsConversionStats data={conversionData} currency={currency} />
          ) : (
            <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-insta" />
          )}
        </div>
      )}

      {(hasInstagramGrowthObjective || hasSpotifyGrowthObjective) && (
        <div className="col-span-12 sm:col-span-4">
          {platformData ? (
            <ResultsPlatformGrowthStats data={platformData} />
          ) : (
            <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-insta" />
          )}
        </div>
      )}

    </div>
  )
}

ResultsStats.propTypes = {
  adData: PropTypes.object.isRequired,
  aggregatedAdData: PropTypes.object.isRequired,
  hasSalesObjective: PropTypes.bool.isRequired,
  hasInstagramGrowthObjective: PropTypes.bool.isRequired,
  hasSpotifyGrowthObjective: PropTypes.bool.isRequired,
  platform: PropTypes.string,
}

ResultsStats.defaultProps = {
  platform: '',
}

export default ResultsStats
