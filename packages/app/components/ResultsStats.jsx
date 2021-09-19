import React from 'react'

import ResultsNewAudienceStats from '@/app/ResultsNewAudienceStats'
import ResultsExistingAudienceStats from '@/app/ResultsExistingAudienceStats'

import MarkdownText from '@/elements/MarkdownText'

import { getNewAudienceData, getExistingAudienceData } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsStats = ({ data }) => {
  const [newAudienceData, setNewAudienceData] = React.useState(null)
  const [existingAudienceData, setExistingAudienceData] = React.useState(null)

  React.useEffect(() => {
    setNewAudienceData(getNewAudienceData(data))
    setExistingAudienceData(getExistingAudienceData(data))
  }, [data])

  return (
    <>
      <div
        className={[
          'col-span-12 sm:col-span-6',
          'order-1',
        ].join(' ')}
      >
        {newAudienceData ? (
          <ResultsNewAudienceStats className="flex flex-col sm:items-center" data={newAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div
        className={[
          'col-span-12 sm:col-span-6',
          'order-2',
        ].join(' ')}
      >
        {existingAudienceData ? (
          <ResultsExistingAudienceStats className="flex flex-col sm:items-center" data={existingAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-green" />
        )}
      </div>
    </>
  )
}

ResultsStats.propTypes = {

}

export default ResultsStats
