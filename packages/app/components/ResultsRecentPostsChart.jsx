import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import moment from 'moment'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

import Spinner from '@/elements/Spinner'

import { formatRecentPosts } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/ResultsPageCopy'

import * as server from '@/app/helpers/appServer'

const ResultsRecentPostsChart = ({ metricType, yourAverage, globalAverage }) => {
  const [posts, setPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistId } = React.useContext(ArtistContext)

  const lastThirtyDays = [...new Array(30)].map((_, index) => moment().startOf('day').subtract(index, 'days').format('YYYY-MM-DD')).reverse()
  const maxValue = Math.max(...posts.map((post) => post[metricType]), yourAverage, globalAverage) + 1

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
    setIsLoading(true)

    const res = await server.getPosts({
      artistId,
      filterBy: {
        date_from: [moment().subtract(30, 'days')],
        date_to: [moment()],
      },
      limit: 60,
    })
    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
    setIsLoading(false)
  }, [])

  return (
    <div>
      <p className="font-bold text-xl">{copy.recentPostsChartTitle(metricType)}</p>
      <ResultsChartHeader
        description={copy.recentPostsChartDescription(metricType)}
        legendItems={legendItems}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        posts.length ? (
          <div className="w-full relative overflow-x-scroll overflow-y-hidden sm:overflow-x-hidden pb-2">
            <ResultsPostsChartBackground
              maxValue={maxValue}
              yourAverage={yourAverage}
              globalAverage={globalAverage}
            >
              {posts.map((post) => (
                <ResultsPostsChartPost
                  key={post.id}
                  post={post}
                  value={post[metricType]}
                  lastThirtyDays={lastThirtyDays}
                  maxValue={maxValue}
                />
              ))}
            </ResultsPostsChartBackground>
          </div>
        ) : (
          <p>No posts found within the last 30 days.</p>
        )
      )}
    </div>
  )
}

ResultsRecentPostsChart.propTypes = {
  metricType: PropTypes.string.isRequired,
  yourAverage: PropTypes.string,
  globalAverage: PropTypes.string,
}

ResultsRecentPostsChart.defaultProps = {
  yourAverage: '',
  globalAverage: '',
}

export default ResultsRecentPostsChart
