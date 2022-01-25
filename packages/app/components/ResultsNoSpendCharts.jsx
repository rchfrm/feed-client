import React from 'react'

import ResultsNoSpendChartsTabs from '@/app/ResultsNoSpendChartsTabs'
import ResultsRecentPostsReachChart from '@/app/ResultsRecentPostsReachChart'
import ResultsRecentPostsEngageChart from '@/app/ResultsRecentPostsEngageChart'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'

const ResultsNoSpendCharts = () => {
  const [audienceType, setAudienceType] = React.useState('reach')

  const charts = {
    reach: ResultsRecentPostsReachChart,
    engage: ResultsRecentPostsEngageChart,
    growth: ResultsFollowerGrowthChart,
  }
  const Chart = charts[audienceType]

  return (
    <div
      className={[
        'col-span-12',
        'mb-6 sm:mb-0',
      ].join(' ')}
    >
      <ResultsNoSpendChartsTabs
        audienceType={audienceType}
        setAudienceType={setAudienceType}
      />
      <Chart />
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
}

export default ResultsNoSpendCharts
