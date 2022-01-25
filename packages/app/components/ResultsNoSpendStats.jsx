import React from 'react'

import ResultsAverageReachStats from '@/app/ResultsAverageReachStats'
import ResultsHighlyEngagedStats from '@/app/ResultsHighlyEngagedStats'
import ResultsSlowGrowthStats from '@/app/ResultsSlowGrowthStats'

import MarkdownText from '@/elements/MarkdownText'

const ResultsNoSpendStats = () => {
  const hasData = true

  return (
    <>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">Average reach</p>
        {hasData ? (
          <ResultsAverageReachStats className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">Highly engaged</p>
        {hasData ? (
          <ResultsHighlyEngagedStats className="flex flex-col sm:items-center" />
        ) : (
          <MarkdownText markdown="No data.." className="px-16 text-center text-xl text-green" />
        )}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <p className="font-bold text-xl sm:text-center">Slow growth</p>
        {hasData ? (
          <ResultsSlowGrowthStats className="flex flex-col sm:items-center" />
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
