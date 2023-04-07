import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'
import { getDataSources, formatDataSources, getSlicedDataSources, instagramDataSources } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthChartLoader = ({
  platform,
  period,
  dataSources,
  setDataSources,
  dataSourceName,
  setBreakdownOptions,
  breakdownBy,
  setBreakdownBy,
  isLoading,
  setIsLoading,
  currency,
  hasInstagramGrowthObjective,
}) => {
  const { artistId } = React.useContext(ArtistContext)

  const [initialDataSources, setInitialDataSources] = React.useState(null)

  useAsyncEffect(async (isMounted) => {
    if (! isMounted()) return

    setIsLoading(true)

    const data = await getDataSources({
      [platform]: dataSourceName,
      facebook: 'facebook_ad_spend_feed',
    }, artistId)

    // Format the data sources to make sure that ad spend and growth data periods match
    const formattedDataSources = formatDataSources(data, dataSourceName)

    setInitialDataSources(formattedDataSources)
    setDataSources(formattedDataSources)

    if (! hasInstagramGrowthObjective) {
      setIsLoading(false)
      return
    }

    if (dataSourceName === instagramDataSources.all) {
      setBreakdownOptions([])
      setBreakdownBy('')
      setIsLoading(false)
      return
    }

    const options = Object.keys(Object.values(formattedDataSources.followerGrowth)[0]).map((key) => ({
      name: key,
      value: key,
    }))
    setBreakdownOptions(options)
    setBreakdownBy(options[0].value)
    setIsLoading(false)
  }, [dataSourceName])

  React.useEffect(() => {
    if (! initialDataSources) {
      return
    }

    const slicedDataSources = getSlicedDataSources(period, initialDataSources)
    const { followerGrowth } = slicedDataSources

    const setDailyDataByBreakdown = (followerGrowth) => {
      return Object.entries(followerGrowth).reduce((result, [key, value]) => {
        return {
          ...result,
          [key]: value[breakdownBy],
        }
      }, {})
    }

    setDataSources({
      ...slicedDataSources,
      followerGrowth: breakdownBy ? setDailyDataByBreakdown(followerGrowth) : followerGrowth,
    })
  }, [initialDataSources, period, setDataSources, breakdownBy])

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
  dataSourceName: PropTypes.string.isRequired,
  setBreakdownOptions: PropTypes.func.isRequired,
  breakdownBy: PropTypes.string.isRequired,
  setBreakdownBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  hasInstagramGrowthObjective: PropTypes.bool.isRequired,
}

ResultsFollowerGrowthChartLoader.defaultProps = {
  dataSources: null,
}

export default ResultsFollowerGrowthChartLoader
