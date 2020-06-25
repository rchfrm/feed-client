
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
import ChartBar from '@/app/ChartBar'
import ChartNumber from '@/app/ChartNumber'
import InsightsProjection from '@/app/InsightsProjection'
import { ArtistContext } from '@/app/contexts/Artist'
// IMPORT STYLES
import styles from '@/app/InsightsPage.module.css'

const ChartContainer = ({
  currentPlatform,
  currentDataSource,
  data,
  loading,
}) => {
  // GET ARTIST CURRENCY
  const { artistId, artistCurrency } = React.useContext(ArtistContext)
  // DEFINE STATE
  const [earliestDataPoint, setEarliestDataPoint] = React.useState(data.earliest.date)
  const [earliestMoment, setEarliestMoment] = React.useState(null)
  const [initialRender, setInitialRender] = React.useState(true)
  React.useEffect(() => {
    if (!data || (data.source === currentDataSource && !initialRender)) return
    setInitialRender(false)
    const { earliest: { date: earliestDate } } = data
    const earliestMoment = moment(earliestDate, 'YYYY-MM-DD')
    setEarliestDataPoint(earliestDate)
    setEarliestMoment(earliestMoment)
  }, [initialRender, data, currentDataSource])

  // DETECT CHART TYPE
  // If there is no data before the last week, display a doughnut chart
  const chartType = React.useMemo(() => {
    if (!earliestMoment) return null
    const minDaysData = 4
    const minDaysDate = moment().subtract(minDaysData, 'days').format('YYYY-MM-DD')
    const chartType = !earliestDataPoint || earliestMoment.isAfter(moment(minDaysDate, 'YYYY-MM-DD'))
      ? 'number'
      : 'bar'
    return chartType
  }, [earliestMoment, earliestDataPoint])

  return (
    <div
      className={[
        styles.chartOuter, chartType === 'number' ? styles._numberChart : '',
      ].join(' ')}
    >

      {chartType === 'bar' && (
        <>
          <div
            className={[
              'breakout--width',
              'col-span-12',
              'lg:grid gap-4 grid-cols-12',
            ].join(' ')}
          >
            <ChartBar
              className={[
                'col-span-12',
                'lg:col-span-6',
                'bmw:col-span-7',
              ].join(' ')}
              data={data}
              artistId={artistId}
              artistCurrency={artistCurrency}
              loading={loading}
            />
            <InsightsProjection
              className={[
                'col-span-12',
                'lg:col-span-5',
                'lg:col-start-8',
                'bmw:col-span-5',
                'bmw:col-start-9',
              ].join(' ')}
              data={data}
              artistId={artistId}
              currentPlatform={currentPlatform}
              currentDataSource={currentDataSource}
              loading={loading}
            />
          </div>
        </>
      )}

      {chartType === 'number' && (
        <ChartNumber
          data={data}
          artistId={artistId}
          artistCurrency={artistCurrency}
          loading={loading}
        />
      )}

    </div>
  )
}

export default ChartContainer
