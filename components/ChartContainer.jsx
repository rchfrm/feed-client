
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
}) => {
  // DEFINE STATE
  const [earliestDataPoint] = React.useState(data.earliest.date)
  const [latestDataPoint] = React.useState(data.mostRecent.date)

  // DETECT CHART TYPE
  // If there is no data before the last week, display a doughnut chart
  const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
  const chartType = !earliestDataPoint || earliestMoment.isAfter(moment(dates.sevenDaysBefore, 'YYYY-MM-DD'))
    ? 'doughnut'
    : 'bar'

  return (
    <div className={styles.chartOuter}>

      {chartType === 'bar' && (
        <ChartBar
          data={data}
          currentPlatform={currentPlatform}
          currentDataSource={currentDataSource}
          earliestDataPoint={earliestDataPoint}
          latestDataPoint={latestDataPoint}
        />
      )}

      {chartType === 'doughnut' && (
        <ChartDoughnut
          data={data}
          currentPlatform={currentPlatform}
          currentDataSource={currentDataSource}
        />
      )}

    </div>
  )
}

export default ChartContainer
