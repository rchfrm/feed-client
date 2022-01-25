import React from 'react'

import ChartLine from '@/app/ChartLine'
import ResultsChartHeader from '@/app/ResultsChartHeader'

import brandColors from '@/constants/brandColors'

const ResultsFollowerGrowthChart = () => {
  const legendItems = [
    {
      label: 'Instagram',
      color: brandColors.instagram.bg,
      lineStyle: 'solid',
    },
    {
      label: 'Facebook',
      color: brandColors.facebook.bg,
      lineStyle: 'solid',
    },
  ]

  const data = {
    period: ['Sept', 'Oct', 'Nov', 'Dec'],
    instagram: {
      text: 'Instagram follower count',
      values: [1500, 2647, 3710, 6650],
    },
    facebook: {
      text: 'Facebook like count',
      values: [650, 1200, 3344, 5062],
    },
  }

  const { period: labels, ...followerGrowthData } = data

  return (
    <>
      <ResultsChartHeader
        title="Follower growth"
        description="See how your Facebook Likes and Instagram Followers are growing over time."
        legendItems={legendItems}
      />
      <ChartLine
        labels={labels}
        data={followerGrowthData}
      />
    </>
  )
}

ResultsFollowerGrowthChart.propTypes = {
}

ResultsFollowerGrowthChart.defaultProps = {
}

export default ResultsFollowerGrowthChart
