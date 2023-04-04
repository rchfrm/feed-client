import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'
import { getDataSources, followerGrowthDataSources, formatDataSources, getSlicedDataSources } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthChartLoader = ({
  platform,
  period,
  dataSources,
  setDataSources,
  currency,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  const [initialDataSources, setInitialDataSources] = React.useState(null)

  useAsyncEffect(async (isMounted) => {
    if (! isMounted() || dataSources) return

    setIsLoading(true)

    const data = await getDataSources({
      [platform]: followerGrowthDataSources[platform],
      facebook: 'facebook_ad_spend_feed',
    }, artistId)

    // Format the data sources to make sure that ad spend and growth data periods match
    const formattedDataSources = formatDataSources(data, platform)

    setInitialDataSources(formattedDataSources)
    setDataSources(formattedDataSources)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    if (! initialDataSources) {
      return
    }

    const slicedDataSources = getSlicedDataSources(period, initialDataSources)

    setDataSources(slicedDataSources)
  }, [initialDataSources, period, setDataSources])

  return (
    <ResultsFollowerGrowthChart
      dataSources={dataSources}
      currency={currency}
      isLoading={isLoading}
    />
  )
}

ResultsFollowerGrowthChartLoader.propTypes = {
  platform: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  dataSources: PropTypes.object,
  setDataSources: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
}

ResultsFollowerGrowthChartLoader.defaultProps = {
  dataSources: null,
}

export default ResultsFollowerGrowthChartLoader
