import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsAdGrowthChart from '@/app/ResultsAdGrowthChart'
import ChartLegend from '@/app/ChartLegend'
import { getDataSources, followerGrowthDataSources, formatChartDailyData } from '@/app/helpers/resultsHelpers'
import copy from '@/app/copy/ResultsPageCopy'
import brandColors from '@/constants/brandColors'

const ResultsAdGrowthChartLoader = ({ platform }) => {
  const [dailyFollowerGrowth, setDailyFollowerGrowth] = React.useState(null)
  const [dailyAdSpend, setDailyAdSpend] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (! isMounted() || dailyFollowerGrowth) return

    setIsLoading(true)

    const data = await getDataSources({
      [platform]: followerGrowthDataSources[platform],
      facebook: 'facebook_ad_spend_feed',
    }, artistId)

    // Format daily data to make sure that ad spend and growth data periods match
    const { adSpend, followerGrowth } = formatChartDailyData(data, platform)

    setDailyAdSpend(adSpend)
    setDailyFollowerGrowth(followerGrowth)
    setIsLoading(false)
  }, [])

  return (
    <div className="col-span-12">
      <ResultsChartHeader description="3.2k extra followers added, at an estimated £0.21 each." />
      <ResultsAdGrowthChart
        adSpend={dailyAdSpend}
        followerGrowth={dailyFollowerGrowth}
        isLoading={isLoading}
      />
      <ChartLegend
        items={[
          {
            label: 'Green line',
            description: 'Change in followers in Feed campaign so far.',
            color: brandColors.green,
          },
          {
            label: 'Red line',
            description: 'Followers without Feed.',
            color: brandColors.red,
          }
      ]}
      />
    </div>
  )
}

ResultsAdGrowthChartLoader.propTypes = {
  platform: PropTypes.string.isRequired,
}

export default ResultsAdGrowthChartLoader
