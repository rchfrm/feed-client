import React from 'react'
import PropTypes from 'prop-types'

import ResultsReachStats from '@/app/ResultsReachStats'
import ResultsEngageStats from '@/app/ResultsEngageStats'
import ResultsGrowthStats from '@/app/ResultsGrowthStats'

import { getNoSpendStatsData } from '@/app/helpers/resultsHelpers'

import MarkdownText from '@/elements/MarkdownText'

const ResultsNoSpendStats = ({ data, setHasGrowth }) => {
  const [reachData, setReachData] = React.useState(null)
  const [engageData, setEngageData] = React.useState(null)
  const [growthData, setGrowthData] = React.useState(null)

  React.useEffect(() => {
    const {
      reachData,
      engageData,
      growthData,
    } = getNoSpendStatsData(data)

    setReachData(reachData)
    setEngageData(engageData)
    setGrowthData(growthData)

    setHasGrowth(growthData.hasGrowth)
  }, [data, setHasGrowth])

  return (
    <>
      <div className="col-span-12 sm:col-span-4">
        {reachData ? (
          <ResultsReachStats data={reachData} />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        {engageData ? (
          <ResultsEngageStats data={engageData} className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-green" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        {growthData ? (
          <ResultsGrowthStats data={growthData} className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-insta" />
        )}
      </div>
    </>
  )
}

ResultsNoSpendStats.propTypes = {
  data: PropTypes.object.isRequired,
  setHasGrowth: PropTypes.func.isRequired,
}

ResultsNoSpendStats.defaultProps = {
}

export default ResultsNoSpendStats
