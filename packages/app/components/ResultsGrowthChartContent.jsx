import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsGrowthChart from '@/app/ResultsGrowthChart'

import brandColors from '@/constants/brandColors'

import { getFollowerGrowth, noSpendDataSources } from '@/app/helpers/resultsHelpers'
import { capitalise } from '@/helpers/utils'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsGrowthChartContent = ({ dailyData, setDailyData }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  // Get follower growth data
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || dailyData) return

    setIsLoading(true)

    const data = await getFollowerGrowth(artistId)

    setDailyData(data)
    setIsLoading(false)
  }, [])

  const legendItems = noSpendDataSources.map(({ platform }) => ({
    label: capitalise(platform),
    color: brandColors[platform].bg,
    lineStyle: 'solid',
  }))

  return (
    <>
      <p className="font-bold text-xl">Follower growth</p>
      <ResultsChartHeader
        title="Follower growth"
        description={copy.growthChartDescription}
        legendItems={legendItems}
      />
      <ResultsGrowthChart
        dailyData={dailyData}
        isLoading={isLoading}
      />
    </>
  )
}

ResultsGrowthChartContent.propTypes = {
  dailyData: PropTypes.array,
  setDailyData: PropTypes.func.isRequired,
}

ResultsGrowthChartContent.defaultProps = {
  dailyData: null,
}

export default ResultsGrowthChartContent
