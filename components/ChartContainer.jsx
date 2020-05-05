
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
import ChartBar from './ChartBar'
import ChartNumber from './ChartNumber'
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
  const { artistCurrency } = React.useContext(ArtistContext)
  // DEFINE STATE
  const [earliestDataPoint, setEarliestDataPoint] = React.useState(data.earliest.date)
  const [latestDataPoint, setLatestDataPoints] = React.useState(data.mostRecent.date)
  React.useEffect(() => {
    if (!data) return
    const { earliest: { date: earliestDate }, mostRecent: { date: latestDate } } = data
    setEarliestDataPoint(earliestDate)
    setLatestDataPoints(latestDate)
  }, [data])

  // DETECT CHART TYPE
  // If there is no data before the last week, display a doughnut chart
  const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
  const minDaysData = 4
  const minDaysDate = moment().subtract(minDaysData, 'days').format('YYYY-MM-DD')
  const chartType = !earliestDataPoint || earliestMoment.isAfter(moment(minDaysDate, 'YYYY-MM-DD'))
    ? 'number'
    : 'bar'

  return (
    <div className={styles.chartOuter}>

      {(chartType === 'bar' || loading) && (
        <ChartBar
          data={data}
          currentPlatform={currentPlatform}
          currentDataSource={currentDataSource}
          earliestDataPoint={earliestDataPoint}
          latestDataPoint={latestDataPoint}
          artistCurrency={artistCurrency}
          loading={loading}
        />
      )}

      {chartType === 'number' && (
        <ChartNumber
          data={data}
          artistCurrency={artistCurrency}
        />
      )}

    </div>
  )
}

export default ChartContainer
