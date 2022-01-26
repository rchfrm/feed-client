import React from 'react'

import ResultsReachStats from '@/app/ResultsReachStats'
import ResultsEngageStats from '@/app/ResultsEngageStats'
import ResultsGrowthStats from '@/app/ResultsGrowthStats'

import MarkdownText from '@/elements/MarkdownText'

const ResultsNoSpendStats = () => {
  const hasData = true

  return (
    <>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">Average reach</p>
        {hasData ? (
          <ResultsReachStats className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">Highly engaged</p>
        {hasData ? (
          <ResultsEngageStats className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-green" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">Slow growth</p>
        {hasData ? (
          <ResultsGrowthStats className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-insta" />
        )}
      </div>
    </>
  )
}

ResultsNoSpendStats.propTypes = {
}

ResultsNoSpendStats.defaultProps = {
}

export default ResultsNoSpendStats
