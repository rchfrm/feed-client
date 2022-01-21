import React from 'react'

import ResultsPostsChartDescription from '@/app/ResultsPostsChartDescription'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

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

const ResultsPostsChart = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-1/2 mb-12">
        <p className="font-bold text-xl">Reach of your recent posts</p>
        <ResultsPostsChartDescription average="0.87%" globalAverage="0.62%" />
      </div>
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

ResultsPostsChart.propTypes = {
}

ResultsPostsChart.defaultProps = {
}

export default ResultsPostsChart
