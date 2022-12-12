import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsOrganicGrowthChart from '@/app/ResultsOrganicGrowthChart'

import brandColors from '@/constants/brandColors'

import { getDataSources, followerGrowthDataSources } from '@/app/helpers/resultsHelpers'
import { capitalise } from '@/helpers/utils'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsOrganicGrowthChartLoader = ({ dailyData, setDailyData }) => {
  const [legendItems, setLegendItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId } = React.useContext(ArtistContext)

  // Get follower growth data
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (! isMounted() || dailyData) return

    setIsLoading(true)

    const { facebook, instagram } = followerGrowthDataSources

    const data = await getDataSources({
      facebook,
      instagram,
    }, artistId)

    const dataArray = Object.values(data)

    setLegendItems(dataArray.map(({ platform }) => ({
      label: capitalise(platform),
      color: brandColors[platform].bg,
      lineStyle: 'solid',
    })))

    setDailyData(dataArray)
    setIsLoading(false)
  }, [])

  return (
    <>
      <p className="font-bold text-xl">Follower growth</p>
      <ResultsChartHeader
        description={copy.organicGrowthChartDescription}
        legendItems={legendItems}
      />
      <ResultsOrganicGrowthChart
        dailyData={dailyData}
        isLoading={isLoading}
      />
    </>
  )
}

ResultsOrganicGrowthChartLoader.propTypes = {
  dailyData: PropTypes.array,
  setDailyData: PropTypes.func.isRequired,
}

ResultsOrganicGrowthChartLoader.defaultProps = {
  dailyData: null,
}

export default ResultsOrganicGrowthChartLoader
