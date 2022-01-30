import React from 'react'
import useAsyncEffect from 'use-async-effect'
import moment from 'moment'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ChartLine from '@/app/ChartLine'
import ResultsChartHeader from '@/app/ResultsChartHeader'

import brandColors from '@/constants/brandColors'
import { getDataSourceValue } from '@/app/helpers/appServer'
import { formatServerData } from '@/app/helpers/insightsHelpers'


const ResultsFollowerGrowthChart = () => {
  const { artistId } = React.useContext(ArtistContext)
  const [dailyData, setDailyData] = React.useState(null)

  const dataSources = [
    {
      platform: 'facebook',
      source: 'facebook_likes',
    },
    {
      platform: 'instagram',
      source: 'instagram_follower_count',
    },
  ]

  const dates = React.useMemo(() => {
    return {
      today: moment().format('YYYY-MM-DD'),
      yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      twoDaysBefore: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      sevenDaysBefore: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      oneMonthBefore: moment().subtract(1, 'month').format('YYYY-MM-DD'),
      sixMonthsBefore: moment().subtract(6, 'month').format('YYYY-MM-DD'),
      startOfYear: moment().startOf('year').format('YYYY-MM-DD'),
    }
  }, [])

  useAsyncEffect(async (isMounted) => {
    if (!isMounted) return

    const {
      facebook_likes: {
        daily_data: dailyFacebookData,
      },
      instagram_follower_count: {
        daily_data: dailyInstagramData,
      },
    } = await getDataSourceValue(['facebook_likes', 'instagram_follower_count'], artistId)

    const formattedData = [dailyFacebookData, dailyInstagramData].map((dailyData, index) => {
      const { source, platform } = dataSources[index]

      return formatServerData({
        dailyData,
        currentDataSource: source,
        currentPlatform: platform,
        dates,
      })
    })

    setDailyData(formattedData)
  }, [])

  const legendItems = [
    {
      label: 'Instagram',
      color: brandColors.instagram.bg,
      lineStyle: 'solid',
    },
    {
      label: 'Facebook',
      color: brandColors.facebook.bg,
      lineStyle: 'solid',
    },
  ]

  if (!dailyData) return null

  return (
    <>
      <ResultsChartHeader
        title="Follower growth"
        description="See how your Facebook Likes and Instagram Followers are growing over time."
        legendItems={legendItems}
      />
      <ChartLine
        data={dailyData}
      />
    </>
  )
}

ResultsFollowerGrowthChart.propTypes = {
}

ResultsFollowerGrowthChart.defaultProps = {
}

export default ResultsFollowerGrowthChart
