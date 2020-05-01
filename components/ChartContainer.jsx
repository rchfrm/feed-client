
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
import ChartBar from './ChartBar'
import ChartDoughnut from './ChartDoughnut'
// IMPORT STYLES
import styles from './InsightsPage.module.css'

const ChartContainer = ({
  currentPlatform,
  currentDataSource,
  dates,
  data,
  loading,
}) => {
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
  const chartType = !earliestDataPoint || earliestMoment.isAfter(moment(dates.sevenDaysBefore, 'YYYY-MM-DD'))
    ? 'doughnut'
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
          loading={loading}
        />
      )}

      {chartType === 'doughnut' && (
        <ChartDoughnut
          data={data}
          currentPlatform={currentPlatform}
          currentDataSource={currentDataSource}
          loading={loading}
        />
      )}

    </div>
  )
}

export default ChartContainer
