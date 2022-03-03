import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import ResultsNoSpendChartsTabs from '@/app/ResultsNoSpendChartsTabs'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { getOrganicBenchmarkData } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendContent = ({ data, resultsType, dummyPostsImages }) => {
  const [resultsData, setResultsData] = React.useState(null)
  const [metricType, setMetricType] = React.useState('reach')
  const [hasGrowth, setHasGrowth] = React.useState(true)

  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const organicBenchmarkData = getOrganicBenchmarkData(data, resultsType)

    setResultsData(organicBenchmarkData)
    setHasGrowth(organicBenchmarkData.growth.hasGrowth)
  }, [data, setHasGrowth, resultsType])

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
            data={resultsData}
            resultsType={resultsType}
            metricType={metricType}
            setHasGrowth={setHasGrowth}
            isDesktopLayout={isDesktopLayout}
            className={isDesktopLayout ? 'order-1' : 'order-2'}
          />
          {resultsType === 'organic' && (
            <ResultsNoSpendChartsTabs
              metricType={metricType}
              setMetricType={setMetricType}
              hasGrowth={hasGrowth}
              className={isDesktopLayout ? 'order-2' : 'order-1'}
            />
          )}
          {resultsData && (
            <ResultsNoSpendCharts
              data={resultsData}
              resultsType={resultsType}
              metricType={metricType}
              hasGrowth={hasGrowth}
              dummyPostsImages={dummyPostsImages}
              className="order-3"
            />
          )}
        </div>
      </div>
    </div>
  )
}

ResultsNoSpendContent.propTypes = {
  data: PropTypes.object.isRequired,
  resultsType: PropTypes.string.isRequired,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

ResultsNoSpendContent.defaultProps = {
}

export default ResultsNoSpendContent
