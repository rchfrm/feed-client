import React from 'react'
import PropTypes from 'prop-types'
import ResultsReachStats from '@/app/ResultsReachStats'
import ResultsEngageStats from '@/app/ResultsEngageStats'
import ResultsGrowthStats from '@/app/ResultsGrowthStats'
import { organicMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendStats = ({
  organicData,
  aggregatedOrganicData,
  hasNoProfiles,
  isDesktopLayout,
  className,
}) => {
  const data = hasNoProfiles ? aggregatedOrganicData : organicData

  const components = {
    reach: ResultsReachStats,
    engagement: ResultsEngageStats,
    growth: ResultsGrowthStats,
  }

  return (
    data && (
      organicMetricTypes.map(({ name }) => {
        if (isDesktopLayout && data[name]) {
          const ResultsStats = components[name]

          return (
            <div key={name} className={[className, 'col-span-12 sm:col-span-4'].join(' ')}>
              <ResultsStats data={data[name]} />
            </div>
          )
        }
        return null
      })
    )
  )
}

ResultsNoSpendStats.propTypes = {
  organicData: PropTypes.object,
  aggregatedOrganicData: PropTypes.object,
  hasNoProfiles: PropTypes.bool.isRequired,
  metricType: PropTypes.string.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

ResultsNoSpendStats.defaultProps = {
  data: null,
}

export default ResultsNoSpendStats
