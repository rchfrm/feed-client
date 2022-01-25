import React from 'react'

import ResultsChartHeader from '@/app/ResultsChartHeader'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

import brandColors from '@/constants/brandColors'

const posts = [
  {
    bottom: '15%',
    left: '0%',
    organicReach: '1.1%',
  },
  {
    bottom: '33.33%',
    left: '6.66%',
    organicReach: '5.2%',
  },
  {
    bottom: '50%',
    left: '33.33%',
    organicReach: '12.1%',
  },
  {
    bottom: '75%',
    left: '66.66%',
    organicReach: '3.9%',
  },
  {
    bottom: '90%',
    left: '86.58%',
    organicReach: '2.0%',
  },
]

const ResultsRecentPostsEngageChart = ({ className }) => {
  const legendItems = [
    {
      label: 'Global average',
      value: '0.62%',
      color: brandColors.black,
      lineStyle: 'dashed',
    },
    {
      label: 'Your average',
      value: '0.87%',
      color: brandColors.greyDark,
      lineStyle: 'dashed',
    },
  ]

  return (
    <div className={className}>
      <ResultsChartHeader
        title="Engagement rate of your recent posts"
        description="See the percentage of your followers that engaged with your posts from the last 30 days."
        legendItems={legendItems}
      />
      <ResultsPostsChartBackground>
        {posts.map(({ bottom, left, organicReach }, index) => (
          <ResultsPostsChartPost
            key={bottom}
            index={index}
            bottom={bottom}
            left={left}
            organicReach={organicReach}
          />
        ))}
      </ResultsPostsChartBackground>
    </div>
  )
}

ResultsRecentPostsEngageChart.propTypes = {
}

ResultsRecentPostsEngageChart.defaultProps = {
}

export default ResultsRecentPostsEngageChart
