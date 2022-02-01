import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Spinner from '@/elements/Spinner'

import ChartLine from '@/app/ChartLine'
import ResultsChartHeader from '@/app/ResultsChartHeader'

import brandColors from '@/constants/brandColors'

import { getDataSourceValue } from '@/app/helpers/appServer'
import { formatServerData } from '@/app/helpers/insightsHelpers'
import { noSpendDataSources } from '@/app/helpers/resultsHelpers'
import { capitalise } from '@/helpers/utils'

const ResultsFollowerGrowthChart = () => {
  const { artistId } = React.useContext(ArtistContext)
  const [dailyData, setDailyData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(null)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted) return

    setIsLoading(true)
    const dataSources = noSpendDataSources.map(({ source }) => source)
    const {
      facebook_likes,
      instagram_follower_count,
    } = await getDataSourceValue(dataSources, artistId)

    const dailyFacebookData = facebook_likes?.daily_data
    const dailyInstagramData = instagram_follower_count?.daily_data

    const formattedData = [dailyFacebookData, dailyInstagramData].map((dailyData, index) => {
      if (!dailyData || !Object.keys(dailyData).length) {
        setIsLoading(false)
        return
      }

      const { source, platform } = noSpendDataSources[index]

      return formatServerData({
        dailyData,
        currentDataSource: source,
        currentPlatform: platform,
      })
    })

    if (!formattedData.filter(data => data).length) {
      setIsLoading(false)
      return
    }

    setDailyData(formattedData)
    setIsLoading(false)
  }, [])

  const legendItems = noSpendDataSources.map(({ platform }) => ({
    label: capitalise(platform),
    color: brandColors[platform].bg,
    lineStyle: 'solid',
  }))

  return (
    <>
      <ResultsChartHeader
        title="Follower growth"
        description="See how your Facebook Likes and Instagram Followers are growing over time."
        legendItems={legendItems}
      />
      <div className="relative w-full" style={{ paddingTop: '50%' }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          {dailyData ? (
            <ChartLine data={dailyData} />
          ) : (
            isLoading ? (
              <Spinner />
            ) : (
              <p className="w-full mb-auto text-center">There is currently no follower growth data available.</p>
            )
          )}
        </div>
      </div>
    </>
  )
}

ResultsFollowerGrowthChart.propTypes = {
}

ResultsFollowerGrowthChart.defaultProps = {
}

export default ResultsFollowerGrowthChart
