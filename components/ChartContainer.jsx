
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
import ChartBar from './ChartBar'
import ChartNumber from './ChartNumber'
import InsightsProjection from './InsightsProjection'
import { ArtistContext } from './contexts/Artist'
// IMPORT STYLES
import styles from './InsightsPage.module.css'

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
  React.useEffect(() => {
    if (!data) return
    const { earliest: { date: earliestDate } } = data
    setEarliestDataPoint(earliestDate)
  }, [data.dataType])

  // DETECT CHART TYPE
  // If there is no data before the last week, display a doughnut chart
  const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
  const minDaysData = 4
  const minDaysDate = moment().subtract(minDaysData, 'days').format('YYYY-MM-DD')
  const [chartType, setChartType] = React.useState('bar')
  React.useEffect(() => {
    const chartType = !earliestDataPoint || earliestMoment.isAfter(moment(minDaysDate, 'YYYY-MM-DD'))
      ? 'number'
      : 'bar'
    setChartType(chartType)
  }, [earliestDataPoint])

  return (
    <div className={[styles.chartOuter, chartType === 'number' ? styles._numberChart : ''].join(' ')}>

      {(chartType === 'bar') && (
        <>
          <div className="breakout--width">
            <ChartBar
              data={data}
              artistId={artistId}
              artistCurrency={artistCurrency}
              loading={loading}
            />
          </div>
          <InsightsProjection
            data={data}
            artistId={artistId}
            currentPlatform={currentPlatform}
            currentDataSource={currentDataSource}
            loading={loading}
          />
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
