import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChart from '@/app/ResultsPostsChart'

import { getRecentPosts, organicMetricTypes, getDummyPosts } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsChartContent = ({
  organicData,
  aggregatedOrganicData,
  hasNoProfiles,
  dummyPostsImages,
  posts,
  setPosts,
  metricType,
}) => {
  const [yourAverage, setYourAverage] = React.useState(0)
  const [globalAverage, setGlobalAverage] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const { platform } = organicData?.growth || {}
  const color = organicMetricTypes.find(({ name }) => name === metricType)?.color

  const { artistId } = React.useContext(ArtistContext)

  // Get recents posts
  useAsyncEffect(async (isMounted) => {
    // Make sure to fetch the data only once
    if (! isMounted() || posts.length || ! globalAverage) return

    setIsLoading(true)

    const data = hasNoProfiles ? getDummyPosts(dummyPostsImages, globalAverage) : await getRecentPosts(artistId, platform)

    setPosts(data)
    setIsLoading(false)
  }, [metricType, globalAverage])

  React.useEffect(() => {
    if (organicData) {
      setYourAverage(organicData[metricType].value)
    }

    if (aggregatedOrganicData) {
      setGlobalAverage(aggregatedOrganicData[metricType].value)
    }
  }, [metricType, organicData, aggregatedOrganicData])

  const legendItems = [
    {
      label: 'Your average',
      value: yourAverage,
      color,
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
      <ResultsPostsChart
        posts={posts}
        yourAverage={yourAverage || 0}
        globalAverage={globalAverage}
        metricType={metricType}
        color={color}
        isLoading={isLoading}
        hasNoProfiles={hasNoProfiles}
      />
    </div>
  )
}

ResultsPostsChartContent.propTypes = {
  organicData: PropTypes.object,
  aggregatedOrganicData: PropTypes.object,
  hasNoProfiles: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  metricType: PropTypes.string.isRequired,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

ResultsPostsChartContent.defaultProps = {
  organicData: null,
  aggregatedOrganicData: null,
}

export default ResultsPostsChartContent
