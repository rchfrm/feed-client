import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import ResultsNoSpendChartsTabs from '@/app/ResultsNoSpendChartsTabs'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const ResultsNoSpendContent = ({ data }) => {
  const [metricType, setMetricType] = React.useState('reach')
  const [hasGrowth, setHasGrowth] = React.useState(true)

  const isDesktopLayout = useBreakpointTest('sm')

  return (
    <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
      <div className="col-span-12">
        <div className={[
          'grid grid-cols-12 sm:col-gap-12',
          'row-gap-8 sm:row-gap-16',
          'sm:mb-0',
        ].join(' ')}
        >
          <ResultsNoSpendStats
            data={data}
            metricType={metricType}
            setHasGrowth={setHasGrowth}
            isDesktopLayout={isDesktopLayout}
            className={isDesktopLayout ? 'order-1' : 'order-2'}
          />
          <ResultsNoSpendChartsTabs
            metricType={metricType}
            setMetricType={setMetricType}
            hasGrowth={hasGrowth}
            className={isDesktopLayout ? 'order-2' : 'order-1'}
          />
          <ResultsNoSpendCharts metricType={metricType} className="order-3" />
        </div>
      </div>
    </div>
  )
}

ResultsNoSpendContent.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsNoSpendContent.defaultProps = {
}

export default ResultsNoSpendContent
