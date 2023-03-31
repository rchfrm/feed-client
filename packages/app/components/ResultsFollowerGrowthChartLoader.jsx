import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'
import { getDataSources, followerGrowthDataSources, formatChartDailyData, sliceDataSources } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthChartLoader = ({
  platform,
  period,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  const [initialDataSources, setInitialDataSources] = React.useState(null)
  const [dataSources, setDataSources] = React.useState(null)

  useAsyncEffect(async (isMounted) => {
    if (! isMounted() || dataSources) return

    setIsLoading(true)

    const data = await getDataSources({
      [platform]: followerGrowthDataSources[platform],
      facebook: 'facebook_ad_spend_feed',
    }, artistId)

    // Format daily data to make sure that ad spend and growth data periods match
    const formattedDataSources = formatChartDailyData(data, platform)

    setInitialDataSources(formattedDataSources)
    setDataSources(formattedDataSources)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    if (! initialDataSources) {
      return
    }

    const slicedDataSources = sliceDataSources(period, initialDataSources)
    setDataSources(slicedDataSources)
  }, [initialDataSources, period])

  return (
    <ResultsFollowerGrowthChart
      dataSources={dataSources}
      isLoading={isLoading}
    />
  )
}

ResultsFollowerGrowthChartLoader.propTypes = {
  platform: PropTypes.string.isRequired,
}

export default ResultsFollowerGrowthChartLoader
