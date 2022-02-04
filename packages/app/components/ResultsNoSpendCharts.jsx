import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import ResultsRecentPostsChart from '@/app/ResultsRecentPostsChart'
import ResultsFollowerGrowthChart from '@/app/ResultsFollowerGrowthChart'

import { getAggregatedOrganicBenchmark, getAggregatedOrganicBenchmarkData } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendCharts = ({ data, metricType, hasGrowth, className }) => {
  const [aggregatedData, setAggregatedData] = React.useState({})

  const yourAverage = data[metricType].value
  const globalAverage = aggregatedData[metricType]?.value

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const { res } = await getAggregatedOrganicBenchmark()
    const aggregatedOrganicBenchmarkData = getAggregatedOrganicBenchmarkData(res)

    setAggregatedData(aggregatedOrganicBenchmarkData)
  }, [])

  return (
    <div className={[className, 'col-span-12'].join(' ')}>
      {metricType === 'growth' && hasGrowth && (
        <ResultsFollowerGrowthChart />
      )}
      {metricType !== 'growth' && (
        <ResultsRecentPostsChart
          metricType={metricType}
          yourAverage={yourAverage}
          globalAverage={globalAverage}
        />
      )}
    </div>
  )
}

ResultsNoSpendCharts.propTypes = {
  data: PropTypes.object.isRequired,
  metricType: PropTypes.string.isRequired,
  hasGrowth: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendCharts
