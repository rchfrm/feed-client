import React from 'react'

import ResultsStats from '@/app/ResultsStats'
import ResultsPostsStats from '@/app/ResultsPostsStats'
import ResultsConversionsTeaser from '@/app/ResultsConversionsTeaser'
// import ResultsConversionsActivator from '@/app/ResultsConversionsActivator'
import ResultsSpendingPausedWarning from '@/app/ResultsSpendingPausedWarning'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'

const ResultsContent = ({ data }) => {
  return (
    <div>
      <div className="flex flex-column sm:flex-row justify-between sm:items-center mb-12">
        <div className="inline-block px-4 py-3 mb-6 sm:mb-0 rounded-button bg-grey-1">
          In the last <strong>30 days</strong>
        </div>
        <ResultsSpendingPausedWarning />
      </div>
      <div className="grid grid-cols-12 col-gap-12 mb-8">
        <div className="col-span-12 sm:col-span-8">
          <div className="grid grid-cols-12 col-gap-12 row-gap-8">
            <ResultsStats
              data={data}
            />
            <ResultsPostsStats
              data={data}
            />
          </div>
        </div>
        <ResultsConversionsTeaser
          className="col-span-12 sm:col-span-4 flex flex-col items-center"
        />
      </div>
      <ResultsSpendOverview spending={data.spend} />
    </div>
  )
}

ResultsContent.propTypes = {

}

export default ResultsContent
