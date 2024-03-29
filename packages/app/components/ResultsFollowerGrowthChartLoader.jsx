import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'
import { getDataSources, formatDataSources, getSlicedDataSources, instagramDataSources, getBreakdownOptions, getBreakdownData } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowthChartLoader = ({
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
  monthlyGrowthRateFallback,
}) => {
  const { artistId, artist } = React.useContext(ArtistContext)
  const { selectedCountries, selectedCities } = React.useContext(TargetingContext)

  const [initialDataSources, setInitialDataSources] = React.useState(null)

  useAsyncEffect(async (isMounted) => {
    if (! isMounted()) return

    setIsLoading(true)

    const data = await getDataSources(['facebook_ad_spend_feed', dataSourceName], artistId)

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
      setBreakdownBy(null)
      setIsLoading(false)
      return
    }

    const options = getBreakdownOptions(formattedDataSources, dataSourceName, selectedCities)
    setBreakdownOptions(options)
    setIsLoading(false)
  }, [dataSourceName])

  React.useEffect(() => {
    if (! initialDataSources) {
      return
    }

    let targetedLocations = []
    if (breakdownBy?.name === 'location') {
      targetedLocations = dataSourceName === instagramDataSources.country ? selectedCountries : selectedCities
    }

    const { followerGrowth } = initialDataSources
    const updatedDataSources = {
      ...initialDataSources,
      followerGrowth: breakdownBy ? getBreakdownData(breakdownBy, followerGrowth, targetedLocations) : followerGrowth,
    }

    const slicedDataSources = getSlicedDataSources(period, updatedDataSources, artist, monthlyGrowthRateFallback)
    setDataSources(slicedDataSources)
  }, [initialDataSources, period, setDataSources, breakdownBy, artist, monthlyGrowthRateFallback, selectedCountries, selectedCities, dataSourceName])

  return (
    <ResultsFollowerGrowthChart
      dataSources={dataSources}
      currency={currency}
      isLoading={isLoading}
    />
  )
}

ResultsFollowerGrowthChartLoader.propTypes = {
  period: PropTypes.string.isRequired,
  dataSources: PropTypes.object,
  setDataSources: PropTypes.func.isRequired,
  dataSourceName: PropTypes.string.isRequired,
  setBreakdownOptions: PropTypes.func.isRequired,
  breakdownBy: PropTypes.object,
  setBreakdownBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  hasInstagramGrowthObjective: PropTypes.bool.isRequired,
  monthlyGrowthRateFallback: PropTypes.number,
}

ResultsFollowerGrowthChartLoader.defaultProps = {
  breakdownBy: null,
  dataSources: null,
  monthlyGrowthRateFallback: null,
}

export default ResultsFollowerGrowthChartLoader
