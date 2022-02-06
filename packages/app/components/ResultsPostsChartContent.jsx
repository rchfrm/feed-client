import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChart from '@/app/ResultsPostsChart'
import Error from '@/elements/Error'

import { getRecentPosts, getAverages } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsChartContent = ({
  posts,
  setPosts,
  aggregatedOrganicBenckmarkData,
  setAggregatedOrganicBenchmarkData,
  metricType,
  organicBenchmarkData,
}) => {
  const [yourAverage, setYourAverage] = React.useState('')
  const [globalAverage, setGlobalAverage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  // Get recents posts
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || posts.length) return

    setIsLoading(true)

    const data = await getRecentPosts(artistId)

    setPosts(data)
    setIsLoading(false)
  }, [metricType])

  // Get aggregated organic benchmark data to set global average for recent posts chart
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || aggregatedOrganicBenckmarkData) return

    const { res, error } = await getAverages()

    if (error) {
      setError(error)
      return
    }

    setAggregatedOrganicBenchmarkData(res)
  }, [metricType])

  React.useEffect(() => {
    if (!organicBenchmarkData || !aggregatedOrganicBenckmarkData) return

    setYourAverage(organicBenchmarkData[metricType].value)
    setGlobalAverage(aggregatedOrganicBenckmarkData[metricType].value)
  }, [metricType, organicBenchmarkData, aggregatedOrganicBenckmarkData])

  const legendItems = [
    {
      label: 'Your average',
      value: yourAverage,
      color: brandColors.greyDark,
      lineStyle: 'dashed',
    },
    {
      label: 'Global average',
      value: globalAverage,
      color: brandColors.black,
      lineStyle: 'dashed',
    },
  ]

  return (
    <div>
      <p className="font-bold text-xl">{copy.recentPostsChartTitle(metricType)}</p>
      <ResultsChartHeader
        description={copy.recentPostsChartDescription(metricType)}
        legendItems={legendItems}
      />
      {error && <Error error={error} />}
      <ResultsPostsChart
        posts={posts}
        yourAverage={yourAverage}
        globalAverage={globalAverage}
        metricType={metricType}
        isLoading={isLoading}
      />
    </div>
  )
}

ResultsPostsChartContent.propTypes = {
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  aggregatedOrganicBenckmarkData: PropTypes.object,
  setAggregatedOrganicBenchmarkData: PropTypes.func.isRequired,
  metricType: PropTypes.string.isRequired,
  organicBenchmarkData: PropTypes.object.isRequired,
}

ResultsPostsChartContent.defaultProps = {
  aggregatedOrganicBenckmarkData: null,
}

export default ResultsPostsChartContent
