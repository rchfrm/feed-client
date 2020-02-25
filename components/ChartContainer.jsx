// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
import ChartFilter from './ChartFilter'
import ChartBar from './ChartBar'
import ChartDoughnut from './ChartDoughnut'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
// IMPORT STYLES
import styles from './ChartContainer.module.css'

const ChartContainer = ({
  data,
  dates,
  displayedDataSources,
  availableDataSources,
  setData,
  setDisplayedDataSources,
}) => {
  return (
    <div className={styles.container}>

      <Chart
        data={data}
        dates={dates}
        displayedDataSources={displayedDataSources}
      />

      <ChartFilter
        availableDataSources={availableDataSources}
        displayedDataSources={displayedDataSources}
        setData={setData}
        setDisplayedDataSources={setDisplayedDataSources}
      />

    </div>
  )
}

export default ChartContainer

function Chart(props) {
// REDEFINE PROPS AS VARIABLES
  const { data } = props
  const { dates } = props
  const { displayedDataSources } = props
  // END REDEFINE PROPS AS VARIABLES

  // DEFINE STATE
  const [earliestDataPoint, setEarliestDataPoint] = React.useState(moment().format('YYYY-MM-DD'))
  const [latestDataPoint, setLatestDataPoint] = React.useState(moment().format('YYYY-MM-DD'))
  // END DEFINE STATE

  // CALCULATE EARLIEST DATA POINT
  React.useEffect(() => {
    // Define an array to store all dates in
    const earliestDates = []
    const latestDates = []

    // Loop through each displayed data source,
    // and add the earliest dates to the 'dates' array
    displayedDataSources.forEach(dataSource => {
      // Return if the data hasn't yet been retrieved from the server
      if (!data[dataSource]) { return }

      earliestDates.push(data[dataSource].earliest.date)
      latestDates.push(data[dataSource].mostRecent.date)
    })

    // Sort the dates array chronologically, and set the earliest date
    const chronologicalEarliest = helper.sortDatesChronologically(earliestDates)
    setEarliestDataPoint(chronologicalEarliest[chronologicalEarliest.length - 1])
    const chronologicalLatest = helper.sortDatesChronologically(latestDates)
    setLatestDataPoint(chronologicalLatest[0])
  }, [data, displayedDataSources])
  // END CALCULATE EARLIEST DATA POINT

  // Convert the earliest data point to a 'moment'
  const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')

  // If there is no data before the last week, display a doughnut chart
  if (!earliestDataPoint || earliestMoment.isAfter(moment(dates.sevenDaysBefore, 'YYYY-MM-DD'))) {
    return (
      <ChartDoughnut
        data={data}
        displayedDataSources={displayedDataSources}
      />
    )
  }

  // Otherwise, display one of two types of stacked bar chart
  return (
    <ChartBar
      data={data}
      displayedDataSources={displayedDataSources}
      earliestDataPoint={earliestDataPoint}
      latestDataPoint={latestDataPoint}
    />
  )
}
