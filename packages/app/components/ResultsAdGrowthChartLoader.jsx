import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsAdGrowthChart from '@/app/ResultsAdGrowthChart'

import { getDataSources, followerGrowthDataSources, formatChartDailyData } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsAdGrowthChartLoader = ({
  dailyGrowthData,
  setDailyGrowthData,
  dailySpendData,
  setDailySpendData,
  platform,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  // Get follower growth data
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || dailyGrowthData) return

    setIsLoading(true)

    const data = await getDataSources({
      [platform]: followerGrowthDataSources[platform],
      facebook: 'facebook_ad_spend_feed',
    }, artistId)

    // Format daily data to make sure that ad spend and growth data periods match
    const { adSpendData, growthData } = formatChartDailyData(data, platform)

    setDailySpendData(adSpendData)
    setDailyGrowthData(growthData)
    setIsLoading(false)
  }, [])

  return (
    <div className="order-3 col-span-12">
      <p className="font-bold text-xl">{copy.adGrowthChartTitle(platform)}</p>
      <ResultsChartHeader
        description={copy.adGrowthChartDescription}
      />
      <ResultsAdGrowthChart
        chartBarData={dailyGrowthData}
        chartLineData={dailySpendData}
        isLoading={isLoading}
      />
    </div>
  )
}

ResultsAdGrowthChartLoader.propTypes = {
  dailyGrowthData: PropTypes.array,
  setDailyGrowthData: PropTypes.func.isRequired,
  dailySpendData: PropTypes.object.isRequired,
  platform: PropTypes.string.isRequired,
}

ResultsAdGrowthChartLoader.defaultProps = {
  dailyGrowthData: null,
}

export default ResultsAdGrowthChartLoader
