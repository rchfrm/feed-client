import React from 'react'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

const ResultsNoSpendContent = () => {
  return (
    <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
      <div className="col-span-12">
        <div className={[
          'grid grid-cols-12 sm:col-gap-12',
          'row-gap-8 sm:row-gap-16',
          'sm:mb-0',
        ].join(' ')}
        >
          <ResultsNoSpendStats />
          <ResultsNoSpendCharts />
        </div>
      </div>
    </div>
  )
}

ResultsNoSpendContent.propTypes = {
}

export default ResultsNoSpendContent
