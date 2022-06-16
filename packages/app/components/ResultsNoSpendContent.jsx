import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import RadioButtonTabs from '@/app/RadioButtonTabs'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import { formatBenchmarkData, organicMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendContent = ({
  organicData,
  aggregatedOrganicData,
  hasNoProfiles,
  dummyPostsImages,
}) => {
  const [formattedOrganicData, setFormattedOrganicData] = React.useState(null)
  const [formattedAggregatedOrganicData, setFormattedAggregatedOrganicData] = React.useState(null)
  const [metricType, setMetricType] = React.useState('reach')
  const [hasGrowth, setHasGrowth] = React.useState(true)

  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const formattedOrganicBenchmarkData = formatBenchmarkData(organicData, hasNoProfiles)
    const formattedAggregatedOrganicBenchmarkData = formatBenchmarkData(aggregatedOrganicData, hasNoProfiles)

    setFormattedOrganicData(formattedOrganicBenchmarkData)
    setFormattedAggregatedOrganicData(formattedAggregatedOrganicBenchmarkData)
    setHasGrowth(formattedOrganicBenchmarkData?.growth?.hasGrowth)
  }, [organicData, aggregatedOrganicData, setHasGrowth, hasNoProfiles])

  return (
    <div className="grid grid-cols-12 sm:gap-x-12 mb-8">
      <div className="col-span-12">
        <div className={[
          'grid grid-cols-12 sm:gap-x-12',
          'gap-y-8',
          'sm:mb-0',
          hasNoProfiles ? null : 'sm:gap-y-16',
        ].join(' ')}
        >
          <ResultsNoSpendStats
            organicData={formattedOrganicData}
            aggregatedOrganicData={formattedAggregatedOrganicData}
            hasNoProfiles={hasNoProfiles}
            metricType={metricType}
            setHasGrowth={setHasGrowth}
            isDesktopLayout={isDesktopLayout}
            className={isDesktopLayout ? 'order-1' : 'order-2'}
          />
          <RadioButtonTabs
            tabs={organicMetricTypes}
            activeTab={metricType}
            setActiveTab={setMetricType}
            shouldHideTab={!hasGrowth && isDesktopLayout}
            tabToHideIndex={2}
            hasNoProfiles={hasNoProfiles}
            className={isDesktopLayout ? 'order-2' : 'order-1'}
          />
          {formattedOrganicData && (
            <ResultsNoSpendCharts
              organicData={formattedOrganicData}
              aggregatedOrganicData={formattedAggregatedOrganicData}
              hasNoProfiles={hasNoProfiles}
              metricType={hasNoProfiles ? 'engagement' : metricType}
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
  organicData: PropTypes.object.isRequired,
  aggregatedOrganicData: PropTypes.object.isRequired,
  hasNoProfiles: PropTypes.bool.isRequired,
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

ResultsNoSpendContent.defaultProps = {
}

export default ResultsNoSpendContent
