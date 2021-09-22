import React from 'react'

import ResultsStats from '@/app/ResultsStats'
import ResultsPostsStats from '@/app/ResultsPostsStats'
import ResultsConversionsTeaser from '@/app/ResultsConversionsTeaser'
import ResultsConversionsActivator from '@/app/ResultsConversionsActivator'
import ResultsSpendingPausedWarning from '@/app/ResultsSpendingPausedWarning'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import moment from 'moment'

const ResultsContent = ({ data }) => {
  const { featureFlags: { conversionsEnabled: conversionsFeatureEnabled } } = React.useContext(ArtistContext)
  const { dateRange } = data
  const yesterday = moment().subtract(1, 'day')
  const isLast30Days = moment(dateRange.to).isSame(yesterday, 'day')

  return (
    <div>
      <div className="flex flex-column sm:flex-row justify-between sm:items-center mb-6 sm:mb-12">
        <div className="inline-block px-4 py-3 mb-6 sm:mb-0 rounded-button bg-grey-1">
          {isLast30Days ? (
            <span>In the last <strong>30 days</strong></span>
          ) : (
            <strong>{moment(dateRange.from).format('DD MMM')} to {moment(dateRange.to).format('DD MMM YYYY')}</strong>
          )}
        </div>
        <ResultsSpendingPausedWarning />
      </div>
      <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
        <div className="col-span-12 sm:col-span-8">
          <div className="grid grid-cols-12 sm:col-gap-12 row-gap-8 sm:row-gap-16 mb-8 sm:mb-0">
            <ResultsStats
              data={data}
            />
            <ResultsPostsStats
              data={data}
            />
          </div>
        </div>
        {conversionsFeatureEnabled ? (
          <ResultsConversionsActivator
            className="col-span-12 sm:col-span-4 flex flex-col sm:items-center"
          />
        ) : (
          <ResultsConversionsTeaser
            className="col-span-12 sm:col-span-4 flex flex-col sm:items-center"
          />
        )}
      </div>
      <ResultsSpendOverview spending={data.spend} />
    </div>
  )
}

ResultsContent.propTypes = {

}

export default ResultsContent
