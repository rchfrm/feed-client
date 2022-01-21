import React from 'react'

import ResultsPostsChartDescription from '@/app/ResultsPostsChartDescription'
import ResultsPostsChartPost from '@/app/ResultsPostsChartPost'
import ResultsPostsChartBackground from '@/app/ResultsPostsChartBackground'

const posts = [
  {
    top: '0%',
    left: '0%',
    organicReach: '1.1%',
  },
  {
    top: '33.33%',
    left: '6.66%',
    organicReach: '5.2%',
  },
  {
    top: '50%',
    left: '33.33%',
    organicReach: '12.1%',
  },
  {
    top: '75%',
    left: '66.66%',
    organicReach: '3.9%',
  },
  {
    top: '90%',
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
        {posts.map(({ top, left, organicReach }) => (
          <ResultsPostsChartPost key={top} top={top} left={left} organicReach={organicReach} />
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
