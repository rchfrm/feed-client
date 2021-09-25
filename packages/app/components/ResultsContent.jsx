import React from 'react'

import ResultsPeriod from '@/app/ResultsPeriod'
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
  const dateFrom = moment(dateRange.from).format('DD MMM')
  const dateTo = moment(dateRange.to).format('DD MMM')

  return (
    <div>
      <div className="flex flex-column sm:flex-row justify-between sm:items-center mb-6 sm:mb-12">
        <ResultsPeriod isLast30Days={isLast30Days} dateFrom={dateFrom} dateTo={dateTo} />
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
            className="hidden col-span-12 sm:col-span-4 sm:flex flex-col sm:items-center"
          />
        ) : (
          <ResultsConversionsTeaser
            className="hidden col-span-12 sm:col-span-4 sm:flex flex-col sm:items-center"
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
