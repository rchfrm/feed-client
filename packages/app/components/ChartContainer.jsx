
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
import Chart from '@/app/Chart'
import ChartNumber from '@/app/ChartNumber'
import InsightsProjection from '@/app/InsightsProjection'
import { ArtistContext } from '@/app/contexts/ArtistContext'
// IMPORT STYLES
import styles from '@/app/InsightsPage.module.css'

const ChartContainer = ({
  dataSource,
  data,
  loading,
}) => {
  // GET ARTIST CURRENCY
  const { artistId, artistCurrency } = React.useContext(ArtistContext)
  // DEFINE STATE
  const [earliestDataPoint, setEarliestDataPoint] = React.useState(data.earliest.date)
  const [initialRender, setInitialRender] = React.useState(true)
  React.useEffect(() => {
    setInitialRender(false)
    const { earliest: { date: earliestDate } } = data
    setEarliestDataPoint(earliestDate)
  // eslint-disable-next-line
  }, [initialRender, dataSource])

  // DETECT CHART TYPE
  // If there is no data before the last week, display a doughnut chart
  const chartType = React.useMemo(() => {
    // Calc earliest moment
    const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
    // Get moment from ${4} before earliest data point
    const minDaysData = 4
    const minDaysMoment = moment().subtract(minDaysData, 'days')
    // If earliest data point is younger than ${4} days, show large number
    return !earliestDataPoint || earliestMoment.isAfter(minDaysMoment)
      ? 'number'
    // Else show bar chart
      : 'bar'
  }, [earliestDataPoint])

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
            <Chart
              chartBarData={data}
              artistId={artistId}
              artistCurrency={artistCurrency}
              loading={loading}
              className={[
                'col-span-12',
                'lg:col-span-6',
                'bmw:col-span-7',
              ].join(' ')}
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
