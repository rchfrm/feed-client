import React from 'react'
import PropTypes from 'prop-types'

import ResultsReachStats from '@/app/ResultsReachStats'
import ResultsEngageStats from '@/app/ResultsEngageStats'
import ResultsGrowthStats from '@/app/ResultsGrowthStats'

import { getNoSpendStatsData } from '@/app/helpers/resultsHelpers'

import MarkdownText from '@/elements/MarkdownText'

const ResultsNoSpendStats = ({ data }) => {
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
  }, [data])

  return (
    <>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">{reachData?.quartile?.copy} reach</p>
        {reachData ? (
          <ResultsReachStats data={reachData} className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">{engageData?.quartile?.copy} engaged</p>
        {engageData ? (
          <ResultsEngageStats data={engageData} className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-green" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">{growthData?.quartile?.copy} growth</p>
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
}

ResultsNoSpendStats.defaultProps = {
}

export default ResultsNoSpendStats
