import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import ResultsStats from '@/app/ResultsStats'
import ResultsFollowerGrowth from '@/app/ResultsFollowerGrowth'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/ResultsPageCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ResultsContent = ({
  adData,
  aggregatedAdData,
  isSpendingPaused,
  hasSetUpProfile,
  isLoading,
}) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const hasSalesObjective = objective === 'sales'
  const hasGrowthObjective = objective === 'growth'
  const hasInstagramGrowthObjective = hasGrowthObjective && platform === 'instagram'
  const hasSpotifyGrowthObjective = hasGrowthObjective && platform === 'spotify'
  const monthlyGrowthRateFallback = (hasInstagramGrowthObjective || hasSpotifyGrowthObjective) && aggregatedAdData[`${platform}_${objective}`]['180d'].organic.rate.value

  if (! isLoading && ! adData) {
    return <MarkdownText markdown={copy.noResultsData(isSpendingPaused, hasSetUpProfile)} />
  }

  return (
    <>
      {hasGrowthObjective && (
        <ResultsFollowerGrowth
          platform={platform}
          hasInstagramGrowthObjective={hasInstagramGrowthObjective}
          monthlyGrowthRateFallback={monthlyGrowthRateFallback}
        />
      )}
      {adData && aggregatedAdData && (
        <ResultsStats
          adData={adData}
          aggregatedAdData={aggregatedAdData}
          hasSalesObjective={hasSalesObjective}
          hasInstagramGrowthObjective={hasInstagramGrowthObjective}
          hasSpotifyGrowthObjective={hasSpotifyGrowthObjective}
          platform={platform}
        />
      )}
    </>
  )
}

ResultsContent.propTypes = {
  adData: PropTypes.object,
  aggregatedAdData: PropTypes.object,
  isSpendingPaused: PropTypes.bool.isRequired,
  hasSetUpProfile: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsContent.defaultProps = {
  adData: null,
  aggregatedAdData: null,
}

export default ResultsContent
