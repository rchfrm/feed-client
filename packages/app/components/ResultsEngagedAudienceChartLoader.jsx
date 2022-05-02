import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsEngagedAudienceChart from '@/app/ResultsEngagedAudienceChart'

import { getDataSources, adDataSources } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsEngagedAudienceChartLoader = ({
  dailyData,
  setDailyData,
  chartType,
  platform,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)

  // Get follower growth data
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || dailyData) return

    setIsLoading(true)

    const dataSources = chartType === 'line'
      ? adDataSources
      : platform === 'instagram'
        ? ['instagram_engaged_1y']
        : ['facebook_engaged_1y']

    const data = await getDataSources(dataSources, artistId)

    setDailyData(data[0])
    setIsLoading(false)
  }, [])

  return (
    <div className="order-3 col-span-12">
      <p className="font-bold text-xl">Your engaged audience</p>
      <ResultsChartHeader
        title="Follower growth"
        description={copy.engageChartDescription}
      />
      <ResultsEngagedAudienceChart
        dailyData={dailyData}
        chartType={chartType}
        isLoading={isLoading}
      />
    </div>
  )
}

ResultsEngagedAudienceChartLoader.propTypes = {
  dailyData: PropTypes.array,
  setDailyData: PropTypes.func.isRequired,
  chartType: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
}

ResultsEngagedAudienceChartLoader.defaultProps = {
  dailyData: null,
}

export default ResultsEngagedAudienceChartLoader
