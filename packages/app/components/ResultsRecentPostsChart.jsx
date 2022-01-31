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
    date: '2022-01-02',
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

const averages = {
  reach: {
    you: 5.87,
    global: 4.62,
  },
  engagement: {
    you: 6.22,
    global: 3.98,
  },
}

const ResultsRecentPostsChart = ({ audienceType }) => {
  const lastThirtyDays = [...new Array(30)].map((_, index) => moment().startOf('day').subtract(index, 'days').format('YYYY-MM-DD')).reverse()
  const maxValue = Math.max(...posts.map((post) => post[audienceType]))
  const yourAverage = averages[audienceType].you
  const globalAverage = averages[audienceType].global

  return (
    <div>
      <ResultsChartHeader
        title={copy.recentPostsChartTitle(audienceType)}
        description={copy.recentPostsChartDescription(audienceType)}
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
              value={post[audienceType]}
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
  audienceType: PropTypes.string.isRequired,
}

ResultsRecentPostsChart.defaultProps = {
}

export default ResultsRecentPostsChart
