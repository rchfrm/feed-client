import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/ResultsPageCopy'

const posts = [
  {
    date: '2022-01-06',
    reach: 12,
    engagement: 2,
  },
  {
    date: '2022-01-10',
    reach: 9,
    engagement: 3.1,
  },
  {
    date: '2022-01-15',
    reach: 6,
    engagement: 8,
  },
  {
    date: '2022-01-20',
    reach: 3,
    engagement: 3.7,
  },
  {
    date: '2022-01-25',
    reach: 0,
    engagement: 5,
  },
]

const ResultsRecentPostsChart = ({ metricType, yourAverage, globalAverage }) => {
  const lastThirtyDays = [...new Array(30)].map((_, index) => moment().startOf('day').subtract(index, 'days').format('YYYY-MM-DD')).reverse()
  const maxValue = Math.max(...posts.map((post) => post[metricType]))

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
      <div className="w-full relative">
        <ResultsPostsChartBackground
          maxValue={maxValue}
          yourAverage={yourAverage}
          globalAverage={globalAverage}
        >
          {posts.map((post, index) => (
            <ResultsPostsChartPost
              key={post.reach}
              index={index}
              post={post}
              value={post[metricType]}
              lastThirtyDays={lastThirtyDays}
              maxValue={maxValue}
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
