import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendChartsTabs from '@/app/ResultsNoSpendChartsTabs'
import ResultsRecentPostsChart from '@/app/ResultsRecentPostsChart'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'

const ResultsNoSpendCharts = ({ hasGrowth }) => {
  const [audienceType, setAudienceType] = React.useState('reach')

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
        hasGrowth={hasGrowth}
      />
      {audienceType === 'growth' ? (
        <ResultsFollowerGrowthChart />
      ) : (
        <ResultsRecentPostsChart
          audienceType={audienceType}
        />
      )}
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
  hasGrowth: PropTypes.bool.isRequired,
}

export default ResultsNoSpendCharts
