import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import ResultsNoSpendChartsTabs from '@/app/ResultsNoSpendChartsTabs'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { getOrganicBenchmarkData } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendContent = ({
  data,
  hasNoProfiles,
  dummyPostsImages,
}) => {
  const [resultsData, setResultsData] = React.useState(null)
  const [metricType, setMetricType] = React.useState('reach')
  const [hasGrowth, setHasGrowth] = React.useState(true)

  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const organicBenchmarkData = getOrganicBenchmarkData(data, hasNoProfiles)

    setResultsData(organicBenchmarkData)
    setHasGrowth(organicBenchmarkData.growth.hasGrowth)
  }, [data, setHasGrowth, hasNoProfiles])

  return (
    <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
      <div className="col-span-12">
        <div className={[
          'grid grid-cols-12 sm:col-gap-12',
          'row-gap-8',
          'sm:mb-0',
          hasNoProfiles ? null : 'sm:row-gap-16',
        ].join(' ')}
        >
          <ResultsNoSpendStats
            data={resultsData}
            metricType={metricType}
            setHasGrowth={setHasGrowth}
            isDesktopLayout={isDesktopLayout}
            className={isDesktopLayout ? 'order-1' : 'order-2'}
          />
          <ResultsNoSpendChartsTabs
            metricType={metricType}
            setMetricType={setMetricType}
            hasGrowth={hasGrowth}
            hasNoProfiles={hasNoProfiles}
            className={isDesktopLayout ? 'order-2' : 'order-1'}
          />
          {resultsData && (
            <ResultsNoSpendCharts
              data={resultsData}
              hasNoProfiles={hasNoProfiles}
              metricType={hasNoProfiles ? 'reach' : metricType}
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
  hasNoProfiles: PropTypes.bool.isRequired,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

ResultsNoSpendContent.defaultProps = {
}

export default ResultsNoSpendContent
