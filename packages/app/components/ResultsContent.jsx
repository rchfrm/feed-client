import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import ResultsStats from '@/app/ResultsStats'
import ResultsAdGrowthChartLoader from '@/app/ResultsAdGrowthChartLoader'
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
}) => {
  const [dailyGrowthData, setDailyGrowthData] = React.useState(null)
  const [dailySpendData, setDailySpendData] = React.useState(null)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const hasSalesObjective = objective === 'sales'
  const hasGrowthObjective = objective === 'growth'
  const hasInstagramGrowthObjective = hasGrowthObjective && platform === 'instagram'
  const hasSpotifyGrowthObjective = hasGrowthObjective && platform === 'spotify'

  if (! adData) {
    return <MarkdownText markdown={copy.noResultsData(isSpendingPaused, hasSetUpProfile)} />
  }

  return (
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
          <ResultsAdGrowthChartLoader
            dailyGrowthData={dailyGrowthData}
            setDailyGrowthData={setDailyGrowthData}
            dailySpendData={dailySpendData}
            setDailySpendData={setDailySpendData}
            platform={platform}
          />
          <ResultsStats
            adData={adData}
            aggregatedAdData={aggregatedAdData}
            hasSalesObjective={hasSalesObjective}
            hasInstagramGrowthObjective={hasInstagramGrowthObjective}
            hasSpotifyGrowthObjective={hasSpotifyGrowthObjective}
            platform={platform}
          />
        </div>
      </div>
    </div>
  )
}

ResultsContent.propTypes = {
  adData: PropTypes.object,
  aggregatedAdData: PropTypes.object,
  isSpendingPaused: PropTypes.bool.isRequired,
  hasSetUpProfile: PropTypes.bool.isRequired,
}

ResultsContent.defaultProps = {
  adData: null,
  aggregatedAdData: null,
}

export default ResultsContent
