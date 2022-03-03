import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import ResultsNoSpendChartsTab from '@/app/ResultsNoSpendChartsTab'
import { noSpendMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendChartsTabs = ({
  metricType,
  setMetricType,
  hasGrowth,
  hasNoProfiles,
  className,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')

  return (
    <ul className={[
      className,
      'col-span-12 grid grid-cols-12 sm:col-gap-12',
      'justify-around mb-0',
    ].join(' ')}
    >
      {Object.keys(noSpendMetricTypes).map((type) => {
        if ((!hasGrowth && isDesktopLayout && type === 'growth') || (isDesktopLayout && hasNoProfiles)) return

        return (
          <ResultsNoSpendChartsTab
            key={type}
            type={type}
            setMetricType={setMetricType}
            metricType={metricType}
          />
        )
      })}
    </ul>
  )
}

ResultsNoSpendChartsTabs.propTypes = {
  metricType: PropTypes.string.isRequired,
  setMetricType: PropTypes.func.isRequired,
  hasGrowth: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendChartsTabs
