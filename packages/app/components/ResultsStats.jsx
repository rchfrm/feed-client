import React from 'react'

import ResultsNewAudienceStats from '@/app/ResultsNewAudienceStats'
import ResultsExistingAudienceStats from '@/app/ResultsExistingAudienceStats'

const ResultsStats = ({ data }) => {
  return (
    <>
      <ResultsNewAudienceStats
        data={data}
        className={[
          'col-span-12 sm:col-span-6',
          'flex flex-col sm:items-center',
          'order-1',
        ].join(' ')}
      />
      <ResultsExistingAudienceStats
        data={data.on_platform}
        className={[
          'col-span-12 sm:col-span-6',
          'flex flex-col sm:items-center',
          'order-2',
        ].join(' ')}
      />
    </>
  )
}

ResultsStats.propTypes = {

}

export default ResultsStats
