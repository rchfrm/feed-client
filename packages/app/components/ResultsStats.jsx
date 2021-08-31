import React from 'react'

import ResultsGrowthStats from '@/app/ResultsGrowthStats'
import ResultsReachStats from '@/app/ResultsReachStats'

const ResultsStats = ({ data }) => {
  return (
    <>
      <ResultsGrowthStats
        data={data}
        className={[
          'col-span-12 sm:col-span-6',
          'flex flex-col items-center',
          'order-1',
        ].join(' ')}
      />
      <ResultsReachStats
        data={data.on_platform}
        className={[
          'col-span-12 sm:col-span-6',
          'flex flex-col items-center',
          'order-2',
        ].join(' ')}
      />
    </>
  )
}

ResultsStats.propTypes = {

}

export default ResultsStats
