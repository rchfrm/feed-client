import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsEngagedAudienceChart from '@/app/ResultsEngagedAudienceChart'

import { getDataSources, engagementDataSources } from '@/app/helpers/resultsHelpers'

const ResultsEngagedAudienceChartLoader = ({
  dailyEngageData,
  setDailyEngageData,
  hasGrowthObjective,
  platform,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)
  const isChartBar = hasGrowthObjective && (platform === 'instagram' || platform === 'facebook')

  // Get follower growth data
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (! isMounted() || dailyEngageData) return

    setIsLoading(true)

    const dataSources = isChartBar ? { [platform]: engagementDataSources[platform] } : engagementDataSources
    const data = await getDataSources(dataSources, artistId)

    setDailyEngageData(isChartBar ? data[engagementDataSources[platform]] : Object.values(data))
    setIsLoading(false)
  }, [])

  return (
    <div className="order-3 col-span-12 mb-12 sm:mb-6 breakout--width">
      <p className="font-bold text-xl px-6 sm:px-0">Your engaged audience</p>
      <ResultsEngagedAudienceChart
        dailyData={dailyEngageData}
        platform={platform}
        isChartBar={isChartBar}
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
