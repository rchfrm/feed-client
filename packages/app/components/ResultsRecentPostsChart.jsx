import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import moment from 'moment'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

import { formatRecentPosts } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/ResultsPageCopy'

import * as server from '@/app/helpers/appServer'

const ResultsRecentPostsChart = ({ metricType, yourAverage, globalAverage }) => {
  const [posts, setPosts] = React.useState([])
  const { artistId } = React.useContext(ArtistContext)

  const lastThirtyDays = [...new Array(30)].map((_, index) => moment().startOf('day').subtract(index, 'days').format('YYYY-MM-DD')).reverse()
  const maxValue = Math.max(...posts.map((post) => post[metricType]), yourAverage, globalAverage)

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

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const res = await server.getPosts({ artistId, limit: 20 })
    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
  }, [])

  return (
    <div>
      <p className="font-bold text-xl">{copy.recentPostsChartTitle(metricType)}</p>
      <ResultsChartHeader
        description={copy.recentPostsChartDescription(metricType)}
        legendItems={legendItems}
      />
      <div className="w-full relative">
        <ResultsPostsChartBackground
          maxValue={maxValue}
          yourAverage={yourAverage}
          globalAverage={globalAverage}
        >
          {posts.map((post, index) => (
            <ResultsPostsChartPost
              artistId={artistId}
              key={post.id}
              index={index}
              post={post}
              value={post[metricType]}
              lastThirtyDays={lastThirtyDays}
              maxValue={maxValue}
              metricType={metricType}
            />
          ))}
        </ResultsPostsChartBackground>
      </div>
    </div>
  )
}

ResultsRecentPostsChart.propTypes = {
  metricType: PropTypes.string.isRequired,
}

ResultsRecentPostsChart.defaultProps = {
}

export default ResultsRecentPostsChart
