
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
// IMPORT COMPONENTS
// IMPORT HELPERS
import helper from './helpers/helper'
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './ChartContainer.module.css'

// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})


const calcGranularity = (earliestMoment, latestMoment) => {
  // Find out number of weeks between earliest and latest dates
  const weeks = latestMoment.diff(earliestMoment, 'weeks', true)
  // If there is less than 4 weeks of data, set granularity to 'days'
  if (weeks < 4) return 'days'
  // If there is less than 26 weeks (0.5 year) of data, set granularity to 'weeks'
  if (weeks < 26) return 'weeks'
  // Otherwise set granularity to 'months'
  return 'months'
}

const calcStartAndEnd = (granularity, earliestMoment, latestMoment) => {
  // If displaying daily data, periods will start from earliest moment,
  // up to and including the latest
  if (granularity === 'days') {
    return [earliestMoment, latestMoment]
  }
  // If displaying weekly data, periods will start from Sunday after earliest moment,
  // up to Sunday before latest moment
  if (granularity === 'weeks') {
    return [earliestMoment.endOf('week'), latestMoment.startOf('week').subtract(1, 'day')]
  }
  // If it's monthly data, periods will be from end of month of earliest moment,
  // up to latest moment
  return [earliestMoment.endOf('month'), latestMoment]
}

// CREATE ARRAY OF PERIOD DATES
const getPeriodDates = (granularity, start, end) => {
  const periodDates = []
  let periodToAdd = start
  while (periodToAdd.isBefore(end, 'day')) {
    periodDates.push(periodToAdd.format('YYYY-MM-DD'))
    periodToAdd = periodToAdd.add(1, granularity).endOf(granularity)
  }
  // Add the final period to the array
  periodDates.push(end.format('YYYY-MM-DD'))
  return periodDates
}

// CREATE ARRAY OF PERIOD LABELS
const getPeriodLabels = (granularity, periodDates) => {
  return periodDates.map((date) => {
    const labelFormat = granularity === 'months' ? 'MMM' : 'DD MMM'
    const dateMoment = moment(date, 'YYYY-MM-DD')
    return dateMoment.format(labelFormat)
  })
}

// CREATE DATA ARRAY
const createDataArray = (datePeriods, dataSource, data) => {
  const dataArray = []
  datePeriods.forEach((date, index) => {
    const { dailyData, dataType } = data
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

function ChartBar({
  data,
  currentPlatform,
  currentDataSource,
  earliestDataPoint,
  latestDataPoint,
}) {
  // DEFINE STATES
  const [dateLabels, setDateLabels] = React.useState([])
  const [chartLimit, setChartLimit] = React.useState({
    max: undefined,
    min: undefined,
  })
  const [chartDataSets, setChartDataSets] = React.useState([])

  // DEFINE DATE PERIODS TO DISPLAY ON CHART
  React.useEffect(() => {
    if (!currentDataSource) return
    // Define relevant moments
    const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
    const latestMoment = moment(latestDataPoint, 'YYYY-MM-DD')
    // Calculate granularity
    const granularity = calcGranularity(earliestMoment, latestMoment)
    // Depending on granularity, determine start and end moments
    const [start, end] = calcStartAndEnd(granularity, earliestMoment, latestMoment)
    // Cycle through from start to end dates, adding
    // each period to the labels and dates array
    const periodDates = getPeriodDates(granularity, start, end)
    // Cycle through the dates and add the relevant labels
    const periodLabels = getPeriodLabels(granularity, periodDates)
    setDateLabels(periodLabels)

    // DEFINE THE DATASET(S) TO DISPLAY
    const dataArray = createDataArray(periodDates, currentDataSource, data)
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

    const chartColor = brandColors[currentPlatform]

    // Set the datasets to display on the chart
    setChartDataSets([
      {
        label: currentDataSource,
        data: carriedArr,
        backgroundColor: helper.hexToRGBA(chartColor, 0.7),
        barPercentage: 0.8,
        categoryPercentage: 1,
        barThickness: 'flex',
        // maxBarThickness: 8,
        // minBarLength: 2,
      },
      {
        label: `new_${currentDataSource}`,
        data: increaseArr,
        backgroundColor: helper.hexToRGBA(chartColor, 0.7),
        barPercentage: 0.8,
        categoryPercentage: 1,
        barThickness: 'flex',
        // maxBarThickness: 8,
        // minBarLength: 2,
      },
    ])
  }, [currentDataSource, earliestDataPoint, latestDataPoint])

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
      backgroundColor: helper.hexToRGBA(brandColors.bgColor, 0.9),
      titleFontFamily: "'Inter', 'sans-serif'",
      bodyFontFamily: "'Inter', 'sans-serif'",
      titleFontSize: 18,
      bodyFontSize: 15,
      titleMarginBottom: 9,
      titleFontColor: brandColors.textColor,
      bodyFontColor: brandColors.textColor,
      bodySpacing: 5,
      xPadding: 15,
      yPadding: 15,
      callbacks: {
        beforeBody(tooltipItem, chart) {
          const dataIndex = tooltipItem[0].index
          const { datasetIndex } = tooltipItem[0]
          const datasetName = chart.datasets[datasetIndex].label
          // If the visible tooltip relates to value added since last period,
          // display the total value on the relevant date in 'beforeBody'
          if (datasetName.indexOf('new_') > -1) {
            const total = helper.formatNumber(sumPreviousAndNewValues(dataIndex))
            const platform = helper.capitalise(currentPlatform)
            return `${total}: ${platform} ${data.title}`
          }
        },
        label(tooltipItem, chart) {
          const { datasetIndex } = tooltipItem
          const datasetName = chart.datasets[datasetIndex].label
          // If there is just one data source displayed, and the tooltip relates to value added since last period,
          // display the positive change in 'label'
          const dataIndex = tooltipItem.index
          if (datasetName.indexOf('new_') > -1) {
            const previousDate = chart.labels[dataIndex - 1]
            return ` ${helper.formatNumber(tooltipItem.value)} more than ${previousDate}`
          }
          const total = sumPreviousAndNewValues(dataIndex)
          const platform = helper.capitalise(currentPlatform)
          return ` ${helper.formatNumber(total)}: ${platform} ${data.title}`
        },
      },
    },
  }
  // DEFINE THE OPTIONS

  return (
    <div className={styles.chartContainer}>
      <Bar
        id="bar-chart"
        data={{
          labels: dateLabels,
          datasets: chartDataSets,
        }}
        options={options}
        width={75}
        height={50}
      />
      <BarChartOverlay max={chartLimit.max} min={chartLimit.min} labels={dateLabels} />
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
