import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

import brandColors from '@/constants/brandColors'

const posts = [
  {
    date: '2022-01-07',
    reach: 2.0,
  },
  {
    date: '2022-01-17',
    reach: 3.9,
  },
  {
    date: '2022-01-19',
    reach: 12.1,
  },
  {
    date: '2022-01-24',
    reach: 5.2,
  },
  {
    date: '2022-01-27',
    reach: 1.1,
  },
]

const ResultsRecentPostsReachChart = ({ className }) => {
  const legendItems = [
    {
      label: 'Global average',
      value: '4.62%',
      color: brandColors.black,
      lineStyle: 'dashed',
    },
    {
      label: 'Your average',
      value: '5.87%',
      color: brandColors.greyDark,
      lineStyle: 'dashed',
    },
  ]

  const lastThirtyDays = [...new Array(30)].map((_, index) => moment().startOf('day').subtract(index, 'days').format('YYYY-MM-DD')).reverse()

  const maxValue = Math.max(...posts.map((post) => post.reach))

  return (
    <div className={className}>
      <ResultsChartHeader
        title="Reach of your recent posts"
        description="See the estimated percentage of your audience your posts from the last 30 days have reached. Your audience is not just your followers, it's also people who have engaged with you before but haven't necessarily followed you."
        legendItems={legendItems}
      />
      <ResultsPostsChartBackground maxValue={maxValue} yourAverage={5.87} globalAverage={4.62}>
        {posts.map((post, index) => (
          <ResultsPostsChartPost
            key={post.reach}
            index={index}
            post={post}
            lastThirtyDays={lastThirtyDays}
            maxValue={maxValue}
          />
        ))}
      </ResultsPostsChartBackground>
    </div>
  )
}

ResultsRecentPostsReachChart.propTypes = {
  className: PropTypes.string.isRequired,
}

ResultsRecentPostsReachChart.defaultProps = {
}

export default ResultsRecentPostsReachChart
