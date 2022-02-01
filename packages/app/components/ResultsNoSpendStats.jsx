import React from 'react'
import PropTypes from 'prop-types'

import ResultsReachStats from '@/app/ResultsReachStats'
import ResultsEngageStats from '@/app/ResultsEngageStats'
import ResultsGrowthStats from '@/app/ResultsGrowthStats'

import { getNoSpendStatsData, noSpendMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendStats = ({
  data,
  metricType,
  setHasGrowth,
  isDesktopLayout,
  className,
}) => {
  const [statsData, setStatsData] = React.useState(null)

  const components = {
    reach: ResultsReachStats,
    engagement: ResultsEngageStats,
    growth: ResultsGrowthStats,
  }

  React.useEffect(() => {
    const noSpendData = getNoSpendStatsData(data)

    setStatsData(noSpendData)
    setHasGrowth(noSpendData.growth.hasGrowth)
  }, [data, setHasGrowth])

  return (
    statsData && (
      <>
        {noSpendMetricTypes.map((type) => {
          if ((isDesktopLayout && statsData[type]) || (!isDesktopLayout && metricType === type)) {
            const ResultsStats = components[type]

            return (
              <div className={[className, 'col-span-12 sm:col-span-4'].join(' ')}>
                <ResultsStats data={statsData[type]} />
              </div>
            )
          }
          return null
        })}
      </>
    )
  )
}

ResultsNoSpendStats.propTypes = {
  data: PropTypes.object.isRequired,
  setHasGrowth: PropTypes.func.isRequired,
  metricType: PropTypes.string.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

ResultsNoSpendStats.defaultProps = {
}

export default ResultsNoSpendStats
