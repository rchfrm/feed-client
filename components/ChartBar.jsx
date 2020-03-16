
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import dataSourceDetails from '../constants/dataSources'
// IMPORT HELPERS
import helper from './helpers/helper'
import brandColours from '../constants/brandColours'
// IMPORT STYLES
import styles from './ChartContainer.module.css'

// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

function ChartBar(props) {
// REDEFINE PROPS AS VARIABLES
  const { data } = props
  const { displayedDataSources } = props

  const { earliestDataPoint } = props
  const { latestDataPoint } = props
  // END REDEFINE PROPS AS VARIABLES

  // DEFINE STATES
  const [datePeriods, setDatePeriods] = React.useState({
    labels: [],
    dates: [],
  })
  const [chartLimit, setChartLimit] = React.useState({
    max: undefined,
    min: undefined,
  })
  const [chartDataSets, setChartDataSets] = React.useState([])
  // END DEFINE STATES

  const calcGranularity = (earliest, latest) => {
    // Convert dates to moments
    const earliestMoment = moment(earliest, 'YYYY-MM-DD')
    const latestMoment = moment(latest, 'YYYY-MM-DD')

    // Find out number of weeks between earliest and latest dates
    const weeks = latestMoment.diff(earliestMoment, 'weeks', true)

    if (weeks < 4) {
      // If there is less than 4 weeks of data, set granularity to 'days'
      return 'days'
    } if (weeks < 26) {
      // If there is less than 26 weeks (0.5 year) of data, set granularity to 'weeks'
      return 'weeks'
    }
    // Otherwise set granularity to 'months'
    return 'months'
  }

  const createDataArray = (datePeriods, dataSource, data) => {
    const dataArray = []
    datePeriods.dates.forEach((date, index) => {
      const dailyData = data[dataSource].daily_data
      const dataType = data[dataSource].type

      // If there is a value for the date, return it
      if (dailyData[date]) {
        dataArray.push(dailyData[date])
        return
      }

      // If the data type is not cumulative, return 0
      if (dataType !== 'cumulative') {
        dataArray.push(0)
        return
      }

      // Check if there are earlier data points available for the data source
      const dateMoment = moment(date, 'YYYY-MM-DD')
      const firstDate = Object.keys(dailyData)[0]
      const firstDateMoment = moment(firstDate, 'YYYY-MM-DD')
      let daysBetween = dateMoment.diff(firstDateMoment, 'days')

      // If there are earlier data values available, return the most recent
      if (daysBetween > 0) {
        let value
        let lastDateChecked = date

        while (daysBetween > 0 && !value) {
          const newMomentToCheck = moment(lastDateChecked, 'YYYY-MM-DD').subtract(1, 'days')
          const newDateToCheck = newMomentToCheck.format('YYYY-MM-DD')

          if (dailyData[newDateToCheck]) {
            value = dailyData[newDateToCheck]
          } else {
            lastDateChecked = newDateToCheck
            daysBetween -= 1
          }
        }

        if (value) {
          dataArray.push(value)
          return
        }
      }

      // If there was a value returned by the previous date, return that
      if (dataArray[index - 1]) {
        dataArray.push(dataArray[index - 1])
        return
      }

      // And if there is still nothing, return 0
      dataArray.push(0)
    })
    return dataArray
  }

  // DEFINE DATE PERIODS TO DISPLAY ON CHART
  React.useEffect(() => {
    // Define relevant moments
    const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
    const latestMoment = moment(latestDataPoint, 'YYYY-MM-DD')

    // Calculate granularity
    const granularity = calcGranularity(earliestDataPoint, latestDataPoint)

    // Depending on granularity, determine start and end moments
    let start
    let end
    if (granularity === 'days') {
      // If displaying daily data, periods will start from earliest moment,
      // up to and including the latest
      start = earliestMoment
      end = latestMoment
    } else if (granularity === 'weeks') {
      // If displaying weekly data, periods will start from Sunday after earliest moment,
      // up to Sunday before latest moment
      start = earliestMoment.endOf('week')
      end = latestMoment.startOf('week').subtract(1, 'day')
    } else {
      // If it's monthly data, periods will be from end of month of earliest moment,
      // up to latest moment
      start = earliestMoment.endOf('month')
      end = latestMoment
    }

    // Cycle through from start to end dates, adding
    // each period to the labels and dates array
    const periodLabels = []
    const periodDates = []
    let periodToAdd = start
    while (periodToAdd.isBefore(end, 'day')) {
      periodDates.push(periodToAdd.format('YYYY-MM-DD'))
      periodToAdd = periodToAdd.add(1, granularity).endOf(granularity)
    }
    // Add the final period to the array
    periodDates.push(end.format('YYYY-MM-DD'))

    // Cycle through the dates and add the relevant labels
    periodDates.forEach(date => {
      const labelFormat = granularity === 'months' ? 'MMM' : 'DD MMM'
      const dateMoment = moment(date, 'YYYY-MM-DD')
      periodLabels.push(dateMoment.format(labelFormat))
    })

    setDatePeriods({
      labels: periodLabels,
      dates: periodDates,
    })
  }, [data, displayedDataSources, earliestDataPoint, latestDataPoint])
  // DEFINE DATE PERIODS TO DISPLAY ON CHART

  // DEFINE THE DATASET(S) TO DISPLAY
  React.useEffect(() => {
    const numberOfDisplayedDataSources = displayedDataSources.length

    // If there are no displayed data sources, reset state
    if (numberOfDisplayedDataSources === 0) {
      setChartLimit({
        max: undefined,
        min: undefined,
      })
      setChartDataSets([])
      return
    }

    // If there is just one data source displayed, show the change from period to period
    if (numberOfDisplayedDataSources === 1) {
      const dataSource = displayedDataSources[0]
      const dataArray = createDataArray(datePeriods, dataSource, data)

      // Set the limits of the charts y axis
      const max = helper.maxArrayValue(dataArray)
      const min = helper.minArrayValue(dataArray)
      setChartLimit({
        max: Math.round(max * 1.01),
        min: Math.round(min * 0.99),
      })

      const increaseArr = dataArray.map((datum, index) => {
        const value = datum - dataArray[index - 1]
        if (index === 0 || value < 0) {
          return 0
        }
        return value
      })

      const carriedArr = dataArray.map((datum, index) => {
        return datum - increaseArr[index]
      })

      // Set the datasets to display on the chart
      setChartDataSets([
        {
          label: displayedDataSources[0],
          data: carriedArr,
          backgroundColor: helper.hexToRGBA(dataSourceDetails[dataSource].colour, 0.7),
          barPercentage: 0.8,
          categoryPercentage: 1,
          barThickness: 'flex',
          // maxBarThickness: 8,
          // minBarLength: 2,
        },
        {
          label: `new_${displayedDataSources[0]}`,
          data: increaseArr,
          backgroundColor: dataSourceDetails[dataSource].colour,
          barPercentage: 0.8,
          categoryPercentage: 1,
          barThickness: 'flex',
          // maxBarThickness: 8,
          // minBarLength: 2,
        },
      ])

      return
    }

    // If there is more than one data source to display, show them on a stacked bar chart
    const datasetsToAdd = []
    const allData = []
    // Go through each displayed data source, and format as a dataset
    displayedDataSources.forEach(dataSource => {
      // Make sure the data for the data source has been retrieved from the server
      if (!data[dataSource]) { return }

      // Create an array of data values
      const dataArray = createDataArray(datePeriods, dataSource, data)

      allData.push(dataArray)

      datasetsToAdd.push({
        label: dataSource,
        data: dataArray,
        backgroundColor: dataSourceDetails[dataSource].colour,
        barPercentage: 0.8,
        categoryPercentage: 1,
        barThickness: 'flex',
      })
    })

    let dataMax = 0
    // Max is the sum of the highest data in each array
    allData.forEach(dataArray => {
      const max = helper.maxArrayValue(dataArray)
      dataMax += max
    })

    // Set the limits of the charts y axis
    setChartLimit({
      max: Math.round(dataMax * 1.01),
      min: 0,
    })

    setChartDataSets(datasetsToAdd)
  }, [data, datePeriods, displayedDataSources, earliestDataPoint, latestDataPoint])
  // END DEFINE THE DATASETS TO DISPLAY

  // MAKE SURE RANGE IS AN EVEN NUMBER
  React.useEffect(() => {
    const range = chartLimit.max - chartLimit.min
    if (range % 2 > 0) {
      setChartLimit({
        max: chartLimit.max + 1,
        min: chartLimit.min,
      })
    }
  }, [chartLimit])
  // END MAKE SURE RANGE IS AN EVEN NUMBER

  const sumPreviousAndNewValues = index => {
    let total = 0
    chartDataSets.forEach(dataset => {
      total += dataset.data[index]
    })
    return total
  }

  // DEFINE THE OPTIONS
  const options = {
    maintainAspectRatio: true,
    responsive: true,
    layout: {
      padding: 0,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          drawBorder: false,
          drawTicks: false,
          display: false,
        },
        ticks: {
          maxRotation: 0,
          display: false,
        },
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          drawBorder: false,
          drawTicks: false,
          display: false,
        },
        dataset: {
          barPercentage: 0.8,
          categoryPercentage: 1,
          barThickness: 'flex',
        },
        ticks: {
          beginAtZero: false,
          display: false,
          max: chartLimit.max,
          min: chartLimit.min,
          stepSize: 1,
          callback(tickValue /* index, ticks */) {
            const mid = (chartLimit.max - chartLimit.min) / 2
            if (
              tickValue === chartLimit.min + mid
              || tickValue === chartLimit.max
              || tickValue === chartLimit.min
            ) {
              return tickValue
            }
          },
          padding: 5,
        },
      }],
    },
    tooltips: {
      backgroundColor: helper.hexToRGBA(brandColours.white, 0.9),
      titleFontFamily: "'SpaceGrotesk', 'sans-serif'",
      bodyFontFamily: "'SpaceGrotesk', 'sans-serif'",
      titleFontSize: 18,
      bodyFontSize: 15,
      titleMarginBottom: 9,
      titleFontColor: brandColours.black,
      bodyFontColor: brandColours.black,
      bodySpacing: 5,
      xPadding: 15,
      yPadding: 15,
      callbacks: {
        beforeBody(tooltipItem, chart) {
          const numberOfDatasets = displayedDataSources.length
          const dataIndex = tooltipItem[0].index
          const { datasetIndex } = tooltipItem[0]
          const datasetName = chart.datasets[datasetIndex].label
          // If the visible tooltip relates to value added since last period,
          // display the total value on the relevant date in 'beforeBody'
          if (numberOfDatasets === 1 && datasetName.indexOf('new_') > -1) {
            const total = helper.formatNumber(sumPreviousAndNewValues(dataIndex))
            const platform = helper.extractDataSourcePlatform(displayedDataSources[0])
            return `${total}: ${helper.capitalise(platform)} ${helper.translateDataSourceId(displayedDataSources[0])}`
          }
        },
        label(tooltipItem, chart) {
          const { datasetIndex } = tooltipItem
          const numberOfDatasets = displayedDataSources.length
          const datasetName = chart.datasets[datasetIndex].label

          // If there is more than one data source displayed, return the value of the data source
          if (numberOfDatasets > 1) {
            const platform = helper.extractDataSourcePlatform(datasetName)
            return ` ${helper.formatNumber(tooltipItem.value)}: ${helper.capitalise(platform)} ${helper.translateDataSourceId(datasetName)}`
          }

          // If there is just one data source displayed, and the tooltip relates to value added since last period,
          // display the positive change in 'label'
          const dataIndex = tooltipItem.index
          if (datasetName.indexOf('new_') > -1) {
            const previousDate = chart.labels[dataIndex - 1]
            return ` ${helper.formatNumber(tooltipItem.value)} more than ${previousDate}`
          }
          const total = sumPreviousAndNewValues(dataIndex)
          const platform = helper.extractDataSourcePlatform(displayedDataSources[0])
          return ` ${helper.formatNumber(total)}: ${helper.capitalise(platform)} ${helper.translateDataSourceId(displayedDataSources[0])}`
        },
      },
    },
  }
  // DEFINE THE OPTIONS

  return (
    <div className={styles.chart}>
      <Bar
        data={{
          labels: datePeriods.labels,
          datasets: chartDataSets,
        }}
        options={options}
        width={75}
        height={50}
        id="bar-chart"
      />
      <style global jsx>
        {`
        #bar-chart {
          padding: 0 5%;
          z-index: 2;
        }
      `}
      </style>
      <BarChartOverlay max={chartLimit.max} min={chartLimit.min} labels={datePeriods.labels} />
    </div>
  )
}

export default ChartBar

function BarChartOverlay({ max: maxValue, min: minValue, labels }) {
  const max = helper.abbreviateNumber(maxValue)
  const min = helper.abbreviateNumber(minValue)
  const mid = helper.abbreviateNumber(((maxValue - minValue) / 2) + minValue)

  const labelList = []

  labels.forEach((label, index) => {
    if (
      index === 0
      || index === labels.length - 1
      || index === Math.round((labels.length - 1) / 2)
    ) {
      labelList.push(
        <li key={label}>{label}</li>,
      )
    }
  })

  return (
    <div className={styles.chartOverlay}>
      <div className={styles.chartMax}>{max}</div>
      <hr className={styles.hr} />
      <div className={styles.chartMid}>{mid}</div>
      <div className={styles.chartMin}>{min}</div>
      <ul className={styles.xAxisLabels}>{labelList}</ul>
    </div>
  )
}
