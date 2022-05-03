import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsEngagedAudienceChart from '@/app/ResultsEngagedAudienceChart'

import { getDataSources, engagementDataSources } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsEngagedAudienceChartLoader = ({
  dailyEngageData,
  setDailyEngageData,
  hasGrowthObjective,
  platform,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)
  const chartType = hasGrowthObjective && (platform === 'instagram' || platform === 'facebook') ? 'bar' : 'line'

  // Get follower growth data
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || dailyEngageData) return

    setIsLoading(true)

    const dataSources = chartType === 'line' ? engagementDataSources : { [platform]: engagementDataSources[platform] }
    const data = await getDataSources(dataSources, artistId)

    setDailyEngageData(data[engagementDataSources[platform]])
    setIsLoading(false)
  }, [])

  return (
    <div className="order-3 col-span-12 mb-12 sm:mb-6">
      <p className="font-bold text-xl">Your engaged audience</p>
      <ResultsChartHeader
        description={copy.engageChartDescription}
      />
      <ResultsEngagedAudienceChart
        dailyData={dailyEngageData}
        chartType={chartType}
        isLoading={isLoading}
      />
    </div>
  )
}

ResultsEngagedAudienceChartLoader.propTypes = {
  dailyEngageData: PropTypes.object,
  setDailyEngageData: PropTypes.func.isRequired,
  hasGrowthObjective: PropTypes.bool.isRequired,
  platform: PropTypes.string.isRequired,
}

ResultsEngagedAudienceChartLoader.defaultProps = {
  dailyEngageData: null,
}

export default ResultsEngagedAudienceChartLoader
