import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendChartsTab from '@/app/ResultsNoSpendChartsTab'
import { noSpendMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendChartsTabs = ({
  metricType,
  setMetricType,
  hasGrowth,
  className,
}) => {
  return (
    <ul className={[
      className,
      'col-span-12 grid grid-cols-12 sm:col-gap-12',
      'justify-around mb-0',
    ].join(' ')}
    >
      {noSpendMetricTypes.map((type) => {
        if (!hasGrowth && type === 'growth') return

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
