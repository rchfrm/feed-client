import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import ResultsNoSpendChartsTabs from '@/app/ResultsNoSpendChartsTabs'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { getOrganicBenchmarkData } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendContent = ({ data }) => {
  const [resultsData, setResultsData] = React.useState(null)
  const [metricType, setMetricType] = React.useState('reach')
  const [hasGrowth, setHasGrowth] = React.useState(true)

  const { artistId } = React.useContext(ArtistContext)

  const isDesktopLayout = useBreakpointTest('sm')

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const organicBenchmarkData = await getOrganicBenchmarkData(data, artistId)

    setResultsData(organicBenchmarkData)
    setHasGrowth(organicBenchmarkData.growth.hasGrowth)
  }, [data, setHasGrowth, artistId])

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
          {resultsData && (
            <ResultsNoSpendCharts
              data={resultsData}
              metricType={metricType}
              hasGrowth={hasGrowth}
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
}

ResultsNoSpendContent.defaultProps = {
}

export default ResultsNoSpendContent
