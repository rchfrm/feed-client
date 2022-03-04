import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChart from '@/app/ResultsPostsChart'
import Error from '@/elements/Error'

import { getRecentPosts, getAverages, noSpendMetricTypes, getDummyPosts } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsChartContent = ({
  hasNoProfiles,
  dummyPostsImages,
  posts,
  setPosts,
  aggregatedOrganicBenckmarkData,
  setAggregatedOrganicBenchmarkData,
  metricType,
  organicBenchmarkData,
}) => {
  const [yourAverage, setYourAverage] = React.useState(0)
  const [globalAverage, setGlobalAverage] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { platform } = organicBenchmarkData?.growth || {}

  const { artistId } = React.useContext(ArtistContext)

  // Get recents posts
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (!isMounted() || posts.length) return

    setIsLoading(true)

    const data = hasNoProfiles ? getDummyPosts(dummyPostsImages) : await getRecentPosts(artistId, platform)

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
    if (organicBenchmarkData) {
      setYourAverage(organicBenchmarkData[metricType].value)
    }

    if (aggregatedOrganicBenckmarkData) {
      setGlobalAverage(aggregatedOrganicBenckmarkData[metricType].value)
    }
  }, [metricType, organicBenchmarkData, aggregatedOrganicBenckmarkData])

  const legendItems = [
    {
      label: 'Your average',
      value: yourAverage,
      color: noSpendMetricTypes[metricType].color,
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
      <p className="font-bold text-xl">{copy.postsChartTitle(metricType, hasNoProfiles)}</p>
      <ResultsChartHeader
        description={copy.postsChartDescription(metricType, hasNoProfiles)}
        legendItems={legendItems}
      />
      {error && <Error error={error} />}
      <ResultsPostsChart
        posts={posts}
        yourAverage={yourAverage || 0}
        globalAverage={globalAverage}
        metricType={metricType}
        isLoading={isLoading}
        hasNoProfiles={hasNoProfiles}
      />
    </div>
  )
}

ResultsPostsChartContent.propTypes = {
  hasNoProfiles: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  aggregatedOrganicBenckmarkData: PropTypes.object,
  setAggregatedOrganicBenchmarkData: PropTypes.func.isRequired,
  metricType: PropTypes.string.isRequired,
  organicBenchmarkData: PropTypes.object,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

ResultsPostsChartContent.defaultProps = {
  aggregatedOrganicBenckmarkData: null,
  organicBenchmarkData: null,
}

export default ResultsPostsChartContent
