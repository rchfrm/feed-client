// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import tinycolor from 'tinycolor2'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
// IMPORT COMPONENTS
import Spinner from './elements/Spinner'
import ChartBarOverlay from './ChartBarOverlay'
// IMPORT HELPERS
import helper from './helpers/helper'
import * as chartHelpers from './helpers/chartHelpers'
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './InsightsPage.module.css'

// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})


function ChartBar({
  data,
  loading = true,
  earliestDataPoint,
  latestDataPoint,
}) {
  console.log('data', data)
  // DEFINE STATES
  const [currentPlatform] = React.useState(data.platform)
  const [currentDataSource] = React.useState(data.source)
  const [dateLabels, setDateLabels] = React.useState([])
  const [chartLimit, setChartLimit] = React.useState({
    max: undefined,
    min: undefined,
  })
  const [chartDataSets, setChartDataSets] = React.useState([])
  // PLACEHOLDER CHART BUILDER
  const showPlaceholder = () => {
    // Get dummy data
    const {
      dataArray,
      periodLabels,
      chartLimit,
    } = chartHelpers.getDummyData()
    // Setup chart
    setDateLabels(periodLabels)
    setChartLimit(chartLimit)
    setChartDataSets([{
      label: 'loading',
      data: dataArray,
      backgroundColor: brandColors.grey,
      barPercentage: 0.8,
      categoryPercentage: 1,
      barThickness: 'flex',
    }])
  }
  // UPDATE CHART CLASSES BASED ON STATE
  const [chartClasses, setChartClasses] = React.useState([])
  React.useEffect(() => {
    if (loading) {
      setChartClasses([styles.chartContainer__bar, styles.chartContainer__loading])
      return
    }
    setChartClasses([styles.chartContainer__bar])
  }, [loading])
  // UPDATE CHART BASED ON STATE
  React.useEffect(() => {
    // HANDLE LOADING
    if (loading) {
      showPlaceholder()
      return
    }
    // Stop if no data source
    if (!currentDataSource) return
    // Define relevant moments
    const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
    const latestMoment = moment(latestDataPoint, 'YYYY-MM-DD')
    // Calculate granularity
    const granularity = chartHelpers.calcGranularity(earliestMoment, latestMoment)
    // Depending on granularity, determine start and end moments
    const [start, end] = chartHelpers.calcStartAndEnd(granularity, earliestMoment, latestMoment)
    // Cycle through from start to end dates, adding
    // each period to the labels and dates array
    const periodDates = chartHelpers.getPeriodDates(granularity, start, end)
    // Cycle through the dates and add the relevant labels
    const periodLabels = chartHelpers.getPeriodLabels(granularity, periodDates)
    console.log('periodLabels', periodLabels)
    setDateLabels(periodLabels)

    // DEFINE THE DATASET(S) TO DISPLAY
    const dataArray = chartHelpers.createDataArray(periodDates, currentDataSource, data)
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

    const { cumulative } = data
    const chartColor = brandColors[currentPlatform]
    const lightColor = tinycolor(chartColor).lighten('12').toString()

    const chartData = [
      {
        label: currentDataSource,
        data: carriedArr,
        backgroundColor: cumulative ? lightColor : chartColor,
        barPercentage: 0.8,
        categoryPercentage: 1,
        barThickness: 'flex',
        // maxBarThickness: 8,
        // minBarLength: 2,
      },
    ]

    console.log('carriedArr', carriedArr)

    // If data is cumulative, show increase
    if (cumulative) {
      const increaseData = {
        label: `new_${currentDataSource}`,
        data: increaseArr,
        backgroundColor: chartColor,
        barPercentage: 0.8,
        categoryPercentage: 1,
        barThickness: 'flex',
      }
      chartData.push(increaseData)
    }
    // Set the datasets to display on the chart
    setChartDataSets(chartData)
  }, [currentDataSource, earliestDataPoint, latestDataPoint, loading])

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
    backgroundColor: 'transparent',
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
          if (loading) return
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
          if (loading) return
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

  return (
    <div className={chartClasses.join(' ')}>
      {/* Loading spinner */}
      {loading && <Spinner className={styles.chartSpinner} />}
      {/* CHART */}
      <Bar
        data={{
          labels: dateLabels,
          datasets: chartDataSets,
        }}
        options={options}
        width={75}
        height={50}
      />
      {/* THE OVERLAY */}
      <ChartBarOverlay
        max={chartLimit.max}
        min={chartLimit.min}
        labels={dateLabels}
        loading={loading}
      />
    </div>
  )
}

export default ChartBar

ChartBar.propTypes = {
  data: PropTypes.object.isRequired,
  earliestDataPoint: PropTypes.string.isRequired,
  latestDataPoint: PropTypes.string.isRequired,
}
