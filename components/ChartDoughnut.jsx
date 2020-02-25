// IMPORT PACKAGES
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import dataSourceDetails from '../constants/dataSources'
import brandColours from '../constants/brandColours'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES
import helper from './helpers/helper'

const ChartDoughnut = ({ data, displayedDataSources }) => {
  // DEFINE STATES
  const [displayData, setDisplayData] = React.useState([])
  const [dataColours, setDataColours] = React.useState([])
  // DEFINE STATES

  React.useEffect(() => {
    // If there are no data sources to display, reset state
    if (displayedDataSources.length === 0) {
      setDisplayData([])
      setDataColours([])
      return
    }

    const updatedDataColours = []
    const updatedDisplayData = []
    displayedDataSources.forEach(dataSource => {
      // Exit if the data source hasn't been returned from the server yet
      if (!data[dataSource]) { return }

      updatedDataColours.push(dataSourceDetails[dataSource].colour)
      updatedDisplayData.push(data[dataSource].mostRecent.value)
    })

    setDataColours(updatedDataColours)
    setDisplayData(updatedDisplayData)
  }, [data, displayedDataSources])

  return (
    <div id="doughnut-chart">
      <style jsx>
        {`
        #doughnut-chart {
          width: 90%;
          margin: 0 5%;
        }
      `}
      </style>
      <Doughnut
        width={100}
        height={100}
        data={{
          labels: displayedDataSources,
          datasets: [
            {
              backgroundColor: dataColours,
              data: displayData,
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          cutoutPercentage: 65.738,
          tooltips: {
            backgroundColor: helper.hexToRGBA(brandColours.white.hex, 0.9),
            titleFontFamily: "'SpaceGrotesk', 'sans-serif'",
            bodyFontFamily: "'SpaceGrotesk', 'sans-serif'",
            titleFontSize: 18,
            bodyFontSize: 15,
            titleMarginBottom: 9,
            titleFontColor: brandColours.black.hex,
            bodyFontColor: brandColours.black.hex,
            bodySpacing: 5,
            xPadding: 15,
            yPadding: 15,
            callbacks: {
              label(tooltipItem, chart) {
                const dataSourceIndex = tooltipItem.index
                const dataSourceName = chart.labels[dataSourceIndex]
                const platform = helper.extractDataSourcePlatform(dataSourceName)
                const dataSourceValue = chart.datasets[0].data[dataSourceIndex]
                return ` ${helper.formatNumber(dataSourceValue)}: ${helper.capitalise(platform)} ${helper.translateDataSourceId(dataSourceName)}`
              },
            },
          },
        }}
      />
    </div>
  )
}

export default ChartDoughnut
