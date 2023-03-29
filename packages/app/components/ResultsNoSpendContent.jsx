import React from 'react'
import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import PropTypes from 'prop-types'
import ResultsOrganicGrowthChartLoader from '@/app/ResultsOrganicGrowthChartLoader'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { formatBenchmarkData } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendContent = ({
  organicData,
  aggregatedOrganicData,
  hasNoProfiles,
}) => {
  const [dailyGrowthData, setDailyGrowthData] = React.useState(null)
  const [formattedOrganicData, setFormattedOrganicData] = React.useState(null)
  const [formattedAggregatedOrganicData, setFormattedAggregatedOrganicData] = React.useState(null)

  const isDesktopLayout = useBreakpointTest('sm')

  React.useEffect(() => {
    const formattedOrganicBenchmarkData = formatBenchmarkData(organicData, hasNoProfiles)
    const formattedAggregatedOrganicBenchmarkData = formatBenchmarkData(aggregatedOrganicData, hasNoProfiles)

    setFormattedOrganicData(formattedOrganicBenchmarkData)
    setFormattedAggregatedOrganicData(formattedAggregatedOrganicBenchmarkData)
  }, [organicData, aggregatedOrganicData, hasNoProfiles])

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
          <ResultsOrganicGrowthChartLoader
            dailyData={dailyGrowthData}
            setDailyData={setDailyGrowthData}
          />
          <ResultsNoSpendStats
            organicData={formattedOrganicData}
            aggregatedOrganicData={formattedAggregatedOrganicData}
            hasNoProfiles={hasNoProfiles}
            isDesktopLayout={isDesktopLayout}
          />
        </div>
      </div>
    </div>
  )
}

ResultsNoSpendContent.propTypes = {
  organicData: PropTypes.object.isRequired,
  aggregatedOrganicData: PropTypes.object.isRequired,
  hasNoProfiles: PropTypes.bool.isRequired,
}

export default ResultsNoSpendContent
