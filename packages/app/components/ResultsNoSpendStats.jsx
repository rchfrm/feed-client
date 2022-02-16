import React from 'react'
import PropTypes from 'prop-types'

import ResultsReachStats from '@/app/ResultsReachStats'
import ResultsEngageStats from '@/app/ResultsEngageStats'
import ResultsGrowthStats from '@/app/ResultsGrowthStats'

import { noSpendMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendStats = ({
  data,
  metricType,
  isDesktopLayout,
  className,
}) => {
  const components = {
    reach: ResultsReachStats,
    engagement: ResultsEngageStats,
    growth: ResultsGrowthStats,
  }

  return (
    data && (
      Object.keys(noSpendMetricTypes).map((type) => {
        if ((isDesktopLayout && data[type]) || (!isDesktopLayout && metricType === type)) {
          const ResultsStats = components[type]

          return (
            <div key={type} className={[className, 'col-span-12 sm:col-span-4'].join(' ')}>
              <ResultsStats data={data[type]} />
            </div>
          )
        }
        return null
      })
    )
  )
}

ResultsNoSpendStats.propTypes = {
  data: PropTypes.object,
  metricType: PropTypes.string.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

ResultsNoSpendStats.defaultProps = {
  data: null,
}

export default ResultsNoSpendStats