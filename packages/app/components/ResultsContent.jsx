import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import ResultsPeriod from '@/app/ResultsPeriod'
import ResultsStats from '@/app/ResultsStats'
import ResultsPostsStats from '@/app/ResultsPostsStats'
import ResultsSpendingPausedWarning from '@/app/ResultsSpendingPausedWarning'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'
import ResultsConversionsTeaser from '@/app/ResultsConversionsTeaser'
import ResultsConversionsActivator from '@/app/ResultsConversionsActivator'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import moment from 'moment'

const getConversionsPreferences = state => state.conversionsPreferences

const ResultsContent = ({ data }) => {
  const { featureFlags: { conversionsEnabled: hasConversionsFeatureEnabled } } = React.useContext(ArtistContext)
  const conversionsPreferences = useControlsStore(getConversionsPreferences)
  const hasSetUpConversions = Object.values(conversionsPreferences).every(Boolean)
  const hasConversionColumn = hasConversionsFeatureEnabled && hasSetUpConversions
  const { dateRange } = data
  const yesterday = moment().subtract(1, 'day')
  const isLast30Days = moment(dateRange.to).isSame(yesterday, 'day')
  const hasSpendFor30Days = moment(dateRange.to).diff(moment((dateRange.from)).startOf('day'), 'days') >= 30
  const dateFrom = moment(dateRange.from).format('DD MMM')
  const dateTo = moment(dateRange.to).format('DD MMM')

  return (
    <div>
      <div className="flex flex-column sm:flex-row justify-between sm:items-center mb-6 sm:mb-12">
        <ResultsPeriod isLast30Days={isLast30Days} dateFrom={dateFrom} dateTo={dateTo} />
        <ResultsSpendingPausedWarning />
      </div>
      <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
        <div className={[
          'col-span-12',
          hasConversionColumn ? null : 'sm:col-span-8',
        ].join(' ')}
        >
          <div className={[
            'grid grid-cols-12 sm:col-gap-12',
            'row-gap-8 sm:row-gap-16',
            hasConversionsFeatureEnabled && !hasSetUpConversions ? 'mb-8' : null,
            'sm:mb-0',
          ].join(' ')}
          >
            <ResultsStats
              data={data}
              hasConversionColumn={hasConversionColumn}
              className={hasConversionColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
            <ResultsPostsStats
              data={data}
              hasSpendFor30Days={hasSpendFor30Days}
              isLast30Days={isLast30Days}
              className={hasConversionColumn ? 'sm:col-span-4' : 'sm:col-span-6'}
            />
          </div>
        </div>
        {!hasConversionsFeatureEnabled && (
          <ResultsConversionsTeaser
            className="hidden col-span-12 sm:col-span-4 sm:flex flex-col sm:items-center"
          />
        )}
        {hasConversionsFeatureEnabled && !hasSetUpConversions && (
          <ResultsConversionsActivator
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
